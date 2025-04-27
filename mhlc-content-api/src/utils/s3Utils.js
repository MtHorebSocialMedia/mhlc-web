const {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    DeleteObjectsCommand,
    ListObjectsV2Command,
    GetObjectCommand,
} = require('@aws-sdk/client-s3');
const { getLogger } = require('../utils/logger');

const logger = getLogger('s3Utils');

function getS3Client() {
    const {
        S3_ENDPOINT_URL,
        S3_REGION,
        S3_ACCESS_KEY,
        S3_SECRET_KEY
    } = process.env;
    return new S3Client({
        region: S3_REGION, // required, but can be any valid S3 region
        endpoint: S3_ENDPOINT_URL, // replace with your region's endpoint
        credentials: {
            accessKeyId: S3_ACCESS_KEY,
            secretAccessKey: S3_SECRET_KEY
        },
        forcePathStyle: false, // DigitalOcean uses virtual-hosted–style URLs
    });
}

async function listFiles(s3Client, bucketName, folderId) {
    const { Contents } = await s3Client.send(new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: folderId,
    }));
    return Contents ? Contents.map(obj => obj.Key) : [];
}

async function readJsonFile(folderId, fileKey) {
    const { S3_BUCKET_NAME } = process.env;
    const s3Client = getS3Client();
    const filePath = `${folderId}/${fileKey}.json`;
    try {
        const { Body } = await s3Client.send(new GetObjectCommand({
            Bucket: S3_BUCKET_NAME, // Space name
            Key: filePath           // File path in the bucket
        }));
        const fileContents = await Body.transformToString();
        return JSON.parse(fileContents);
    } catch(err) {
        if (err.name === 'NoSuchKey') {
            logger.debug(`No file [${S3_BUCKET_NAME}/${filePath}] found.`);
            return null;
        } else {
            throw err; // rethrow other errors
        }
    }
}

async function writeJsonFile(folderId, fileKey, contents) {
    const { S3_BUCKET_NAME } = process.env;
    const s3Client = getS3Client();
    const filePath = `${folderId}/${fileKey}.json`;
    await s3Client.send(new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,         // Space name
        Key: filePath,                  // File path in the bucket
        Body: JSON.stringify(contents),
        ACL: 'public-read',             // or 'private'
    }));
    logger.debug('S3 file uploaded successfully at: ', `${S3_BUCKET_NAME}/${filePath}`);
}

async function deleteJsonFile(folderId, fileKey) {
    const { S3_BUCKET_NAME } = process.env;
    const s3Client = getS3Client();
    await s3Client.send(new DeleteObjectCommand({
        Bucket: S3_BUCKET_NAME,             // Space name
        Key: `${folderId}/${fileKey}.json`  // File path in the bucket
    }));
}

async function deleteAllFiles(folderId) {
    const { S3_BUCKET_NAME } = process.env;
    const s3Client = getS3Client();
    const files = await listFiles(s3Client, S3_BUCKET_NAME, folderId);
    await s3Client.send(new DeleteObjectsCommand({
        Bucket: S3_BUCKET_NAME,             // Space name
        Delete: { Objects: files.map((k) => ({ Key: k })) }
    }));
}

module.exports = {
    readJsonFile,
    writeJsonFile,
    deleteJsonFile,
    deleteAllFiles
};

