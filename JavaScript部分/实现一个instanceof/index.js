function _instanceof(a, b) {
  while (a) {
    if (a.__proto__ === b.prototype) return true;
    a = a.__proto__;
  }
  return false;
}

function Test() {}
let test = new Test();

console.log(_instanceof(Object, Function));
console.log(_instanceof(Function, Function));
console.log(_instanceof(Test, Function));
console.log(_instanceof(test, Object));
