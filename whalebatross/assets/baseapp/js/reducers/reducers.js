import { combineReducers } from 'redux'
import { currentUser } from './user';
import { posts } from './posts';

const rootReducer = combineReducers({
  currentUser,
  posts
})

export default rootReducer