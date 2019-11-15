const moment = require('moment');

const dateJS = new Date();
console.log(dateJS);

dateJS.setMinutes(dateJS.getMinutes() -5);
const result = dateJS.toISOString();
console.log(result);

