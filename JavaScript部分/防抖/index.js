// ! t ms之后执行一次
function debounce(func, wait) {
  let timer = null;
  return function(...args) {
    if (timer != null) {
      clearTimeout(timer);
    }
    timer = setTimeout(_ => {
      func.call(this, ...args);
    }, wait);
  };
}

function a(ac) {
  console.log('ac: ', ac);
}
debounce(a, 5000)(1);
