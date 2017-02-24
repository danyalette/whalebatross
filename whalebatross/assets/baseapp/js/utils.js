export function apiGet(url) {
  return http('GET', url, null, false);
}

export function apiPost(url, data) {
  return http('POST', url, data, true);
}

export function apiPut(url, data) {
  return http('PATCH', url, data, true);
}

function http(type, url, data, includeToken) {
  var data = JSON.stringify(data);
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    if (includeToken) xhr.setRequestHeader('X-CSRFToken', document.querySelector('input[name=csrfmiddlewaretoken]').value);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText))
            } else {
               reject(xhr.statusText);
            }
        }
    };
    xhr.send(data);
  });
}
