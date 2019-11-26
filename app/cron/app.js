let running = false;

(() => {
  setInterval(() => {
    console.log('running setInterval');
    console.log('running is ', running);
    if (!running) {
      console.log('running function');
      testFunction()
    }
  },10000);
})();

const testFunction = () => {
  console.log('hello from function');
  running = true;
  setTimeout(() => {
    console.log('test', Date.now());
    running = false;
  },11000)
};