const myPromise = require('./promise');
let promise = new myPromise((resolve, reject) => {});
promise.catch(_ => {
  console.log('error');
});
