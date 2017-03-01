import { apiGet } from 'utils';

export const RECEIVE_SITE_SETTINGS = 'RECEIVE_SITE_SETTINGS';

function receiveSiteSettings(settings) {
  return {
    type: RECEIVE_SITE_SETTINGS,
    settings: settings
  }
}

export function retrieveSiteSettings() {
  return dispatch => {
    return apiGet('/api/settings/')
      .then(data => dispatch(receiveSiteSettings(data.results[0])))
  }
}