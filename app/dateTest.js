const newDate = new Date();
const newDateFromInput = new Date('2019-10-10 08:35:38.504135+00');
const newDateFromInputOffset = newDateFromInput.getTimezoneOffset();
const doubleDate = new Date(newDateFromInput);

console.log(newDate);
console.log(newDateFromInput);
console.log(newDateFromInputOffset);
console.log(doubleDate);