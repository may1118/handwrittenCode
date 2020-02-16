/**
 *
 * @param {Array} arr 有关的数组
 * @param {Function} callback 回调函数
 * @param {*} initial 原始值
 */
function reduce(arr, callback, initial) {
  let i = 0;
  // ! 需要判断有没有传递原始值
  let acc = initial === undefined ? arr[i++] : initial;
  for (; i < arr.length; i++) {
    acc = callback(acc, arr[i], i, arr);
  }
  return acc;
}
// * test
let a = [1, 2, 3];
function add(a, b) {
  return a + b;
}
let ans = reduce(a, add, 0);
console.log('ans: ', ans);
