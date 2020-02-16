// ! 每t ms执行一次
function throtte(func, wait) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(_ => {
        func.call(this, ...args);
        timer = null;
      }, wait);
    }
  };
}

function a(ac) {
  console.log('ac: ', ac);
}
throtte(a, 5000)(1);
