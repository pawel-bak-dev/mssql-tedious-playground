var AWS = require('aws-sdk');

const OPTIONS = {
  type: 'sns',
  protocol: 'https',
  region: 'us-west-2',
  arn: 'arn:aws:sns:us-west-2:949953444104:a3-stg',
  endpoint: 'https://sns.us-west-2.amazonaws.com',
  messageEndpoint: 'https://a3-queue-stg.my-a3.com/message'
};
var snsApiVersion = '2010-03-31';


var options = {
  apiVersion: snsApiVersion,
  endpoint: OPTIONS.endpoint,
  region: OPTIONS.region,
};
if (OPTIONS.accessKeyId) {
  options.accessKeyId = OPTIONS.accessKeyId;
}
if (OPTIONS.secretAccessKey) {
  options.secretAccessKey = OPTIONS.secretAccessKey;
}
//
// console.log(new AWS.SNS(options));




const message = '{Type: "Notification",MessageId: "95df01b4-ee98-5cb9-9903-4c221d41eb5e",Subject: "a3-update-queue",Message: {}}';

console.log(typeof message);

// const stringMessage = JSON.stringify(message);
// console.log(stringMessage);
// console.log(typeof stringMessage);
// console.log(stringMessage[]);
//
// const parseMessage = JSON.parse(stringMessage);
// console.log(parseMessage);