function ajax(options) {
  let { method, url, success, async, params, headers, data } = options;
  method = method || 'GET';
  // 修改url
  url += params
    ? '?' +
      Object.keys(params)
        .map(key => key + '=' + params[key])
        .join('&')
    : '';

  let xml = new XMLHttpRequest();
  xml.open(method, url, async);
  xml.onreadystatechange = function() {
    if (xml.readyState === 4) {
      if ((xml.status >= 200 && xml.status < 300) || xml.status === 304) {
        success && success(xml.responseTest);
      }
    }
  };
  // 添加请求头
  if (headers) {
    Object.keys(headers).forEach(key =>
      xml.setRequestHeader(key, headers[key])
    );
  }
  method === 'GET' ? xml.send() : xml.send(data);
  xml.send(params);
}

ajax({
  method: 'GET',
  url: '...',
  success: res => {
    console.log(res);
  },
  async: true,
  params: {
    a: 1,
    b: 2
  },
  headers: {
    'Content-Type': 'application/json'
  }
});
