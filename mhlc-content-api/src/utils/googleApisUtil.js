const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { Readable } = require('stream');

const { GoogleAuth } = require('google-auth-library');
const { drive_v3 } = require('@googleapis/drive');
const { sheets_v4 } = require('@googleapis/sheets');

const { getLogger } = require('../utils/logger');
const logger = getLogger('googleApisUtil');

const SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets'
];

const CREDENTIALS_PATH = path.join(
    process.cwd(),
    './credentials/credentials.json'
);

let initialized = false;
const initCallbacks = [];

let authClient;
let driveClient;
let sheetsClient;

/* ------------------ lifecycle ------------------ */

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
        const privateKey = Buffer
            .from(process.env.GOOGLE_APIS_ANALYTICS_PRIVATE_KEY_B64, 'base64')
            .toString();

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

        initialized = true;

        while (initCallbacks.length) {
            initCallbacks.shift()();
        }

    } catch (err) {
        logger.error(
            'Failed to initialize Google APIs service.',
            err
        );
    }
}

/* ------------------ auth + clients ------------------ */

async function getAuth() {
    if (!authClient) {
        authClient = new GoogleAuth({
            keyFile: CREDENTIALS_PATH,
            scopes: SCOPES
        });
    }
    return authClient;
}

async function getDrive() {
    if (!driveClient) {
        driveClient = new drive_v3.Drive({
            auth: await getAuth()
        });
    }
    return driveClient;
}

async function getSheets() {
    if (!sheetsClient) {
        sheetsClient = new sheets_v4.Sheets({
            auth: await getAuth()
        });
    }
    return sheetsClient;
}

/* ------------------ drive helpers ------------------ */

async function listFiles(folderId) {
    const drive = await getDrive();
    const res = await drive.files.list({
        q: `'${folderId}' in parents and trashed = false`,
        fields: 'files(id, name)',
        spaces: 'drive'
    });
    return res.data.files || [];
}

async function readJsonFile(folderId, fileKey) {
    if (!isInitialized()) return null;

    const drive = await getDrive();
    const files = await listFiles(folderId);

    const file = files.find(
        f => f.name.startsWith(fileKey) && f.name.endsWith('.json')
    );

    if (!file) return null;

    const res = await drive.files.get(
        { fileId: file.id, alt: 'media' },
        { responseType: 'stream' }
    );

    return new Promise((resolve, reject) => {
        let data = '';
        res.data
            .on('data', chunk => (data += chunk.toString()))
            .on('end', () => resolve(JSON.parse(data)))
            .on('error', reject);
    });
}

async function writeJsonFile(folderId, fileKey, contents) {
    if (!isInitialized()) return;

    await deleteJsonFile(folderId, fileKey);

    const drive = await getDrive();

    const res = await drive.files.create({
        resource: {
            name: `${fileKey}.json`,
            parents: [folderId]
        },
        media: {
            mimeType: 'application/json',
            body: Readable.from(JSON.stringify(contents))
        },
        fields: 'id'
    });

    logger.debug('Created JSON drive file:', res.data.id);
}

async function deleteJsonFile(folderId, fileKey) {
    if (!isInitialized()) return;

    const drive = await getDrive();
    const files = await listFiles(folderId);

    const ids = files
        .filter(f => f.name.startsWith(fileKey) && f.name.endsWith('.json'))
        .map(f => f.id);

    await Promise.all(ids.map(id => drive.files.delete({ fileId: id })));
}

async function deleteAllFiles(folderId) {
    if (!isInitialized()) return;

    const drive = await getDrive();
    const files = await listFiles(folderId);

    await Promise.all(
        files.map(f => drive.files.delete({ fileId: f.id }))
    );
}

/* ------------------ sheets helpers ------------------ */

async function readSheetValues(spreadsheetId, range) {
    const sheets = await getSheets();
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range
    });
    return res.data.values;
}

async function writeSheetValues(spreadsheetId, range, values) {
    const sheets = await getSheets();
    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        requestBody: { values }
    });
}

/* ------------------ exports ------------------ */

module.exports = {
    isInitialized,
    onInitialized,
    initialize,
    readJsonFile,
    writeJsonFile,
    deleteJsonFile,
    deleteAllFiles,
    readSheetValues,
    writeSheetValues
};
