const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { google } = require('googleapis');
const { getLogger } = require('../utils/logger');
const { isbot } = require('isbot');

const logger = getLogger('analyticsService');

const SCOPES = [ 'https://www.googleapis.com/auth/spreadsheets' ];
const TOKEN_PATH = path.join(process.cwd(), './credentials/token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), './credentials/credentials.json');

let initialized = false;

async function initialize() {
    if (process.env.GOOGLE_APIS_ANALYTICS_ENABLED === 'true') {
        try {
            const privateKeyB64 = process.env.GOOGLE_APIS_ANALYTICS_PRIVATE_KEY_B64;
            const privateKey = Buffer.from(privateKeyB64, 'base64').toString();
            const credentials = {
                type: 'service_account',
                project_id: process.env.GOOGLE_APIS_ANALYTICS_PROJECT_ID,
                private_key_id: process.env.GOOGLE_APIS_ANALYTICS_PRIVATE_KEY_ID,
                private_key: privateKey,
                client_email: process.env.GOOGLE_APIS_ANALYTICS_CLIENT_EMAIL,
                client_id: process.env.GOOGLE_APIS_ANALYTICS_CLIENT_ID,
                auth_uri: 'https://accounts.google.com/o/oauth2/auth',
                token_uri: 'https://oauth2.googleapis.com/token',
                auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
                client_x509_cert_url: process.env.GOOGLE_APIS_ANALYTICS_CLIENT_X509_CERT_URL
            };

            await fs.writeFile(
                CREDENTIALS_PATH,
                JSON.stringify(credentials, null, 2)
            );

            await authorize();

            setInterval(processEvents, 10000);

            initialized = true;

        } catch (err) {
            logger.error('An error occurred attempting to initialize the analytics service.  This service will not be active.', err);
        }
    } else {
      logger.info('Analytics disabled in environment variables.');
    }
}
/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = new google.auth.GoogleAuth({
        keyFile: CREDENTIALS_PATH,
        scopes: SCOPES
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

const events = [];

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function writeEvent(event) {
    if (process.env.GOOGLE_APIS_ANALYTICS_ENABLED === 'true' && initialized && !isbot(event.userAgent)) {
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
        ip: ip.replace('::ffff:', ''),
        agent,
        fromFacebook: resource.includes('fbclid='),
        fromEnews: resource.includes('src=enews')
    })).filter(({ environment, resourceType, agent }) => (environment.startsWith('prod') && !isbot(agent) && (resourceType === 'route' || resourceType === 'dialog')));
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

module.exports = { initialize, writeEvent, getEvents };
