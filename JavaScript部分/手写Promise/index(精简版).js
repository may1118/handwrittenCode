const PENDING = 1;
const FULILLED = 2;
const REJECTED = 3;

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
    const resolve = value => {
      if (this.state === PENDING) {
        if (this.state === PENDING) {
          this.state = FULILLED;
          this.value = value;
        }
      }
    };
    const rejected = reason => {
      this.state = REJECTED;
      this.reason = reason;
    };
    // ! 需要立即执行，但是如果代码中有异步的内容，就无法执行下去了,this.state一致时PENDING
    executor(resolve, rejected);
  }
  then(onFulfilled, onRejected) {
    if (this.state === FULILLED) {
      onFulfilled(this.value);
    }
    if (this.state === REJECTED) {
      onRejected(this.reason);
    }
  }
}

module.exports = myPromise;
