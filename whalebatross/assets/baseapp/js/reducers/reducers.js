import { combineReducers } from 'redux'
import { currentUser } from './user';
import { posts } from './posts';
import { categories } from './categories';
import { siteSettings } from './sitesettings';

const rootReducer = combineReducers({
  currentUser,
  posts,
  categories,
  siteSettings
})

export default rootReducer