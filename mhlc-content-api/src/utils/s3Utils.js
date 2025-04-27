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
        S3_ACCESS_KEY,
        S3_SECRET_KEY
    } = process.env;
    return new S3Client({
        region: "us-east-1", // required, but can be any valid AWS region
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
    try {
        const { Body } = await s3Client.send(new GetObjectCommand({
            Bucket: S3_BUCKET_NAME,             // Space name
            Key: `${folderId}/${fileKey}.json`  // File path in the bucket
        }));
        return Body.transformToString();
    } catch(err) {
        if (err.name === 'NoSuchKey') {
            logger.debug(`No file [${S3_BUCKET_NAME}/${folderId}/${fileKey}.json] found.`);
            return null;
        } else {
            throw err; // rethrow other errors
        }
    }
}

async function writeJsonFile(folderId, fileKey, contents) {
    const { S3_BUCKET_NAME } = process.env;
    const s3Client = getS3Client();
    const { Location } = await s3Client.send(new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,             // Space name
        Key: `${folderId}/${fileKey}.json`, // File path in the bucket
        Body: JSON.stringify(contents),
        ACL: 'public-read',                 // or 'private'
    }));
    logger.debug('S3 file uploaded successfully at: ', Location);
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

