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
    if (this.state === FULILLED) {
      onFulfilled(this.value);
    }
    if (this.state === REJECTED) {
      onRejected(this.reason);
    }
    // ! 使用观察订阅者模式，如果初始化代码没有执行完成，需要将有关回调放入回调数组
    if (this.state === PENDING) {
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}

module.exports = myPromise;
