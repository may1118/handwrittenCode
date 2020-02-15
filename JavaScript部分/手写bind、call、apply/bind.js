/**
 * @context 需要绑定的对象
 * @bindArgs 运行的时需要传入的参数
 */
Function.prototype.bind = function(context, ...bindArgs) {
  const func = this;
  context = context || window;

  if (typeof func !== 'function') {
    throw new TypeError('Bind must be called on a function');
  }
  /**
   * @callArgs 运行时传入的参数
   */
  return function(...callArgs) {
    let args = bindArgs.concat(callArgs);
    console.log('func: ', func);
    console.log('context: ', context);
    console.log('args: ', args);
    if (this instanceof func) {
      return new func(...args);
    }
    return func.call(context, ...args);
  };
};
