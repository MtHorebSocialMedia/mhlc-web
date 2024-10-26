require('dotenv').config();

const key = process.env.GOOGLE_APIS_ANALYTICS_PRIVATE_KEY;

const b64Key = Buffer.from(key).toString('base64');

console.log(b64Key);
