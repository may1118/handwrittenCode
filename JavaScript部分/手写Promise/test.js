const myPromise = require('./index');
let promise = new myPromise((resolve, reject) => {
  setTimeout(_ => {
    resolve(100);
  }, 1000);
});
promise
  .then(
    res => {
      return 100;
      new myPromise((res, rej) => {
        res(
          new myPromise((res, rej) => {
            res('===');
          })
        );
      });
    },
    err => {
      return err;
    }
  )
  .then(
    res => {
      console.log('res: ', res);
      return res;
    },
    err => {
      console.log('err: ', err);
      return err;
    }
  );
// promise.catch(_ => {
//   console.log('error');
// });
// promise
//   .all(
//     new myPromise(res => {
//       res(100);
//     }),
//     new myPromise(res => {
//       res(100);
//     })
//   )
//   .then(res => {
//     console.log(res);
//   });
