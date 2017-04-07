import {
  RECEIVE_CATEGORIES
} from 'actions/categories'

const INITIAL_CATEGORIES_STATE = []

export function categories(state = INITIAL_CATEGORIES_STATE, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return action.categories && action.categories.results
        ? action.categories.results
        : state
    default:
      return state
  }
}