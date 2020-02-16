const PENDING = 1;
const FULILLED = 2;
const REJECTED = 3;
// todo 解决多步链式问题
class myPromise {
  /**
   *
   * @param {function} executor 执行者
   */
  constructor(executor) {
    /**
     * * state 表示运行的状态
     * * value 表示成功之后的值
     * * reason 表示失败之后的值
     */
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    // ! 成功和失败的回调函数
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = value => {
      if (this.state === PENDING) {
        if (this.state === PENDING) {
          this.state = FULILLED;
          this.value = value;
          // TODO 如果状态改变需要执行之前压入的方法
          this.onResolvedCallbacks.forEach(func => func());
        }
      }
    };
    const rejected = reason => {
      this.state = REJECTED;
      this.reason = reason;
      // TODO 如果状态改变需要执行之前压入的方法
      this.onRejectedCallbacks.forEach(func => func());
    };
    executor(resolve, rejected);
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : e => {
            throw e;
          };
    let promise2 = new myPromise((resolved, rejected) => {
      if (this.state === FULILLED) {
        /**
         * * 判断then方法后返回值的类型
         * ? Promise
         * ? 1\2\3\普通值
         * ! 要进入下一次事件循环，才能拿到promise2
         */
        setTimeout(_ => {
          let res = onFulfilled(this.value);
          resolvePromise(promise2, res, resolved, rejected);
        }, 0);
      }
      if (this.state === REJECTED) {
        setTimeout(_ => {
          let res = onRejected(this.reason);
          resolvePromise(promise2, res, resolved, rejected);
        }, 0);
      }
      // ! 使用观察订阅者模式，如果初始化代码没有执行完成，需要将有关回调放入回调数组
      if (this.state === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(_ => {
            let res = onFulfilled(this.value);
            resolvePromise(promise2, res, resolved, rejected);
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(_ => {
            let res = onRejected(this.reason);
            resolvePromise(promise2, res, resolved, rejected);
          }, 0);
        });
      }
    });
    return promise2;
  }
  // ? 不能实现有关功能
  catch(err) {
    return this.then(null, err);
  }
  all(promises) {
    return new myPromise((resolve, rejected) => {
      let cnt = 0;
      let res = [];
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          res => {
            res[i] = res;
            if (++cnt == promises.length) resolve(res);
          },
          err => {
            rejected(err);
          }
        );
      }
    });
  }
}
/**
 *
 * @param {*} promise
 * @param {*} res
 * @param {*} resolve
 * @param {*} rejected
 */
const resolvePromise = (promise, res, resolve, rejected) => {
  // * 链式调用时，返回本身
  if (promise === res) {
    return new TypeError('循环引用');
  }

  if (res instanceof myPromise) {
    try {
      const then = res.then;
      if (typeof then === 'function') {
        then.call(
          res,
          y => {
            // resolve(y);
            // ! 需要递归解析，防止resolve里面内容的多次嵌套
            resolvePromise(promise, y, resolve, rejected);
          },
          r => {
            rejected(r);
          }
        );
      }
    } catch (err) {
      rejected(error);
    }
  } else {
    resolve(res);
  }
};
module.exports = myPromise;
