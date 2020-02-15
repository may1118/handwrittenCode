function _new(fun, ...args) {
  if (typeof fun !== 'function') {
    new TypeError('new must be a function');
  }
  let obj = Object.create(fun.prototype);
  let res = fun.call(obj, ...args);
  // ! 如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用将返回该对象引用。
  if (res != null && (typeof res === 'object' || typeof res === 'function')) {
    return res;
  }
  return obj;
}
function Person(name) {
  this.name = name;
}
let TT = _new(Person, 'mzy');
console.log(TT);
