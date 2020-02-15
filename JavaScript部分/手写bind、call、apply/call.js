Function.prototype.call = function(context, ...args) {
  context = context || window;
  context.func = this;

  if (typeof context.func !== 'function') {
    throw new TypeError('call must be called on a function');
  }
  // 直接运行即可，返回运行结果
  let res = context.func(...args);
  delete context.func;
  return res;
};

function test(a, b) {
  console.log('b: ', b);
  console.log('a: ', a);
  console.log(this.name);
}
test.call({ name: 'mzy' }, 1, 2);
