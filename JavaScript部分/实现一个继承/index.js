function Father(name) {
  console.log(name);
  this.name = name;
}
// Father.prototype.getName = function() {
//   return this.name;
// };

function Son(name) {
  Father.call(this, name);
}
// * 第一种方法
Son.prototype = Object.create(Father.prototype);
Son.prototype.constructor = Son;
// * 第二种方法
// Object.setPrototypeOf(Son.prototype, Father.prototype);
// ! 共享同一片地址空间
Father.prototype.getName = function() {
  console.log(this);
  return this.name + 'hello';
};
let stu = new Son('mzy');
console.log(stu.getName());
