import $ from '@rtorr/ajax-only';

export function apiGet(url) {
  return httpWithoutCSRF('GET', url);
}

export function apiPost(url, data) {
  return httpWithCSRF('POST', url, data);
}

export function apiPostForm(url, data) {
  return httpWithCSRF('POST', url, data, null, false);
}

export function apiPut(url, data) {
  return httpWithCSRF('PATCH', url, data);
}

export function apiAuth(username, password) {
  return httpWithCSRF('POST', '/auth/', null,
    'Basic ' + btoa(username + ':' + password)
  );
}

export function apiLogout() {
  return httpWithoutCSRF('DELETE', '/auth/');
}

export function fetchCurrentUser() {
  return httpWithoutCSRF('GET', '/api/user/current/');
}

function httpWithCSRF(type, url, data, auth, contentType) {
  return http(type, url, data, true, auth, contentType);
}

function httpWithoutCSRF(type, url, data, auth, contentType) {
  return http(type, url, data, false, auth, contentType);
}

function http(type, url, data, includeToken = true, authHeader, contentType = 'application/json') {
  return new Promise(function(resolve, reject) {
    $.ajax({
        url: url,
        data: data,
        processData: false,
        contentType: contentType,
        type: type,
        beforeSend: function(request) {
          if (contentType)
            request.setRequestHeader('Content-type', contentType);
          if (includeToken)
            request.setRequestHeader('X-CSRFToken', document.querySelector('input[name=csrfmiddlewaretoken]').value);
          if (authHeader)
            request.setRequestHeader('Authorization', authHeader);
        }
      }).then(function(response){
        resolve(response);
      }).fail(function(message){
        reject(message);
      })
  });
}
