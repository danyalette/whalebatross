export function apiGet(url) {
  return http('GET', url, null, false);
}

export function apiPost(url, data) {
  return http('POST', url, data, true);
}

export function apiPut(url, data) {
  return http('PATCH', url, data, true);
}

export function apiAuth(username, password) {
  return http('POST', 'auth/', null, true,
    "Basic " + btoa(username + ":" + password)
  );
}

export function apiLogout() {
  return http('DELETE', 'auth/', null, true);
}

export function fetchCurrentUser() {
  return http('GET', 'user/current/', null, true);
}

function http(type, url, data, includeToken = true, authHeader) {
  var data = JSON.stringify(data);
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    if (includeToken) xhr.setRequestHeader('X-CSRFToken', document.querySelector('input[name=csrfmiddlewaretoken]').value);
    if (authHeader) xhr.setRequestHeader("Authorization", authHeader);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if ([200, 201].includes(xhr.status)) {
              if (xhr.responseText) resolve(JSON.parse(xhr.responseText))
              else resolve();
            } else {
               reject(xhr.statusText);
            }
        }
    };
    xhr.send(data);
  });
}
