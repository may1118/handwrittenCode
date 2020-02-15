function foo(data) {
  document.getElementById('data').innerHTML = data;
}

(function jsonp() {
  let head = document.getElementsByTagName('head')[0];
  let js = document.createElement('script');
  js.src = 'xxx?callback = foo&a=1&b=2';
  head.appendChild(js);
})();

function testJsonp(callback, a, b) {
  return `${callback}(${a + b})`;
}
