const { google } = require('googleapis');
const { isInitialized, onInitialized, authorize } = require('../utils/googleApisUtil');
const { getLogger } = require('../utils/logger');
const { isbot } = require('isbot');

const logger = getLogger('analyticsService');

const events = [];

onInitialized(() => {
    setInterval(processEvents, 10000);
});

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function writeEvent(event) {
    if (process.env.GOOGLE_APIS_ANALYTICS_ENABLED === 'true' && isInitialized() && !isbot(event.userAgent)) {
        events.push(event);
    }
}

async function getEvents(monthId) {
    const auth = await authorize();
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_APIS_ANALYTICS_SHEET_ID,
        range: `Events-${monthId}!A2:J`
    });
    return res.data.values.map(([dateTime, environment, status, method, resourceType, resource, duration, referrer, ip, agent]) => ({
        dateTime,
        environment,
        status,
        method,
        resourceType,
        resource,
        duration,
        referrer,
        ip: ip ? ip.replace('::ffff:', '') : '',
        agent,
        fromFacebook: resource.includes('fbclid='),
        fromEnews: resource.includes('src=enews')
    })).filter(({ environment, resourceType, agent }) => (environment.startsWith('prod') && (!agent || !isbot(agent)) && (resourceType === 'route' || resourceType === 'dialog' || resourceType === 'cms')));
}

async function processEvents() {
    if (events.length > 0) {
        const eventsToProcess = [];
        while (events.length > 0) {
            eventsToProcess.push(events.shift());
        }
        await writeToSheets(eventsToProcess);
    }
}

async function writeToSheets(events) {
    const auth = await authorize();
    return new Promise((resolve, reject) => {
        try {
            const sheets = google.sheets({ version: 'v4', auth });
            const monthId = new Date().toISOString().substring(0, 7);
            const resource = {
                values: events.map((event) => ([
                    event.dateTime,
                    process.env.NODE_ENV,
                    event.statusCode,
                    event.method,
                    event.resourceType,
                    event.resource,
                    event.duration,
                    event.referrer,
                    event.ip,
                    event.userAgent
                ]))
            };
            sheets.spreadsheets.values.append({
                spreadsheetId: process.env.GOOGLE_APIS_ANALYTICS_SHEET_ID,
                range: `Events-${monthId}!A1`,
                valueInputOption: 'RAW',
                resource
            }, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        } catch (err) {
            logger.error(`An error occurred trying to write events to google sheets.  These [${resource.values.length}] events will be lost.`, err);
        }
    });
}

module.exports = { writeEvent, getEvents };
