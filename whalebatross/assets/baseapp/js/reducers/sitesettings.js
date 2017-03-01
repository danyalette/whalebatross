import {
  RECEIVE_SITE_SETTINGS
} from 'actions/sitesettings'

export function siteSettings(state = { }, action) {
  switch (action.type) {
    case RECEIVE_SITE_SETTINGS:
      return {
        ...state,
        ...action.settings
      }
    default:
      return state
  }
}