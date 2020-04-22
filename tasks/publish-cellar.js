'use strict';

const AWS = require('aws-sdk');
const fs = require('fs-extra');
const mime = require('mime-types');
const rawGlob = require('glob');
const zlib = require('zlib');
const { promisify } = require('util');

const glob = promisify(rawGlob);
const gzip = promisify(zlib.gzip);

const host = 'cellar-c2.services.clever-cloud.com';
const bucket = 'components';

const accessKeyId = process.env.CELLAR_accessKeyId;
const secretAccessKey = process.env.CELLAR_secretAccessKey;

async function run () {

  const uploadToCellar = cellar({ host, bucket, accessKeyId, secretAccessKey });

  const fileList = await glob('cdn/**/*', { nodir: true });

  // const file = 'cdn/1.4.0/stats.html';

  for (const file of fileList) {
    const remoteFilepath = file.replace(/^cdn\//, '');
    console.log(file, remoteFilepath);
    await uploadToCellar(file, remoteFilepath);
  }
}

function cellar ({ accessKeyId, secretAccessKey, host, bucket }) {

  AWS.config.update({ accessKeyId, secretAccessKey });
  const s3 = new AWS.S3({
    endpoint: new AWS.Endpoint(host),
    signatureVersion: 'v4',
  });

  return async function (filepath, remoteFilepath = filepath) {
    const rawBody = await fs.readFile(filepath);
    // const Body = await gzip(rawBody);
    const Body = rawBody;
    const ContentType = mime.lookup(filepath);
    // const ContentEncoding = 'gzip';
    const Metadata = { customfield: 'customvalue' };
    // const ContentEncoding = null;
    console.log(`Uploading file on Cellar ...`);
    console.log(`\tfile ${filepath}`);
    console.log(`\tto ${remoteFilepath}`);
    return new Promise((resolve, reject) => {
      const params = {
        ACL: 'public-read',
        ContentType,
        // ContentEncoding,
        Metadata,
        Body,
        Bucket: bucket,
        Key: remoteFilepath,
      };
      return s3.putObject(params, (err) => err ? reject(err) : resolve());
    }).then(() => console.log(`\tDONE!`));
  };
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
