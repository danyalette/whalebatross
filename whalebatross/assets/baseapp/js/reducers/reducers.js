import { combineReducers } from 'redux'
import { currentUser } from './user';
import { posts } from './posts';
import { siteSettings } from './sitesettings';

const rootReducer = combineReducers({
  currentUser,
  posts,
  siteSettings
})

export default rootReducer