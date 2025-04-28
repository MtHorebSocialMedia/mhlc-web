const { isInitialized, onInitialized, readSheetValues, writeSheetValues } = require('../utils/googleApisUtil');
const { getLogger } = require('../utils/logger');
const { isbot } = require('isbot');

const logger = getLogger('analyticsService');

const events = [];

onInitialized(() => {
    setInterval(processEvents, 10000);
});

async function writeEvent(event) {
    if (process.env.GOOGLE_APIS_ANALYTICS_ENABLED === 'true' && isInitialized() && !isbot(event.userAgent)) {
        events.push(event);
    }
}

async function getEvents(monthId) {
    const values = await readSheetValues(
        process.env.GOOGLE_APIS_ANALYTICS_SHEET_ID,
        `Events-${monthId}!A2:J`
    );
    return values.map(([dateTime, environment, status, method, resourceType, resource, duration, referrer, ip, agent]) => ({
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
    try {
        const monthId = new Date().toISOString().substring(0, 7);
        const values = events.map((event) => ([
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
        ]));
        await writeSheetValues(
            process.env.GOOGLE_APIS_ANALYTICS_SHEET_ID,
            `Events-${monthId}!A1`,
            values
        );
    } catch (err) {
        logger.error(`An error occurred trying to write events to google sheets.  These [${resource.values.length}] events will be lost.`, err);
    }
}

module.exports = { writeEvent, getEvents };
