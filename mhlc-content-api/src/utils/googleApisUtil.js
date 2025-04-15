const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { google } = require('googleapis');
const { getLogger } = require('../utils/logger');

const logger = getLogger('googleApisUtil');

const SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets'
];
const TOKEN_PATH = path.join(process.cwd(), './credentials/token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), './credentials/credentials.json');

let initialized = false;

const initCallbacks = [];

function isInitialized() {
    return initialized;
}

function onInitialized(callback) {
    if (!initialized) {
        initCallbacks.push(callback);
    } else {
        callback();
    }
}

async function initialize() {
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

        initialized = true;

        while (initCallbacks.length > 0) {
            const callback = initCallbacks.shift();
            callback();
        }

    } catch (err) {
        logger.error('An error occurred attempting to initialize the analytics service.  This service will not be active.', err);
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

module.exports = { isInitialized, onInitialized, initialize, authorize };