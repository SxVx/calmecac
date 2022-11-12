const aws = require('aws-sdk');
const winston = require('./winston');
const util = require('util');

const s3 = new aws.S3({
  endpoint: process.env.SPACES_ENDPOINT,
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET,
  Bucket: process.env.SPACES_NAME,
  signatureVersion: 'v4',
});

const s3upload = (fileBuffer, storePath) => {
  const params = {
    Bucket: process.env.SPACES_NAME,
    Key: storePath,
    Body: fileBuffer,
  };
  return s3.putObject(params).promise();
};

const s3getUrl = async (path) => {
  try {
    if (!path) return null;

    // If it doesn't find the file it throws an error which is handled by try catch
    await s3
      .headObject({
        Bucket: process.env.SPACES_NAME,
        Key: path,
      })
      .promise();

    return await s3.getSignedUrl('getObject', {
      Bucket: process.env.SPACES_NAME,
      Key: path,
      Expires: 60 * 5, // time in seconds
    });
  } catch (error) {
    winston.error(util.format(error));
    return null;
  }
};

const s3delete = (fileBuffer, storePath) => {
  const params = {
    Bucket: process.env.SPACES_NAME,
    Key: storePath,
    Body: fileBuffer,
  };
  return s3.deleteObject(params).promise();
};

module.exports = {
  s3upload,
  s3getUrl,
  s3,
  s3delete,
};
