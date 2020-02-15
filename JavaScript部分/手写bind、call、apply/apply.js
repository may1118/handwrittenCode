Function.prototype.apply = function(context, args) {
  // 测试这里是Node的环境
  context = context || global;
  // 测试这里是浏览器环境
  context = context || window;
  context.func = this;
  if (typeof context.func !== 'function') {
    throw new TypeError('apply must be called on function');
  }
  let res = context.func(...args);
  delete context.func;
  return res;
};
function test(a, b) {
  console.log('b: ', b);
  console.log('a: ', a);
  console.log(this.name);
}
// 测试apply，第二个参数是一个数组
test.apply({ name: 'mzy' }, [1, 2]);
test.apply(null, [1, 2, 3]);
