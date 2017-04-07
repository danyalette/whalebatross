import { apiGet } from 'utils';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories: categories
  }
}

export function getCategories() {
  return dispatch => {
    return apiGet('/api/categories/')
      .then(response => dispatch(receiveCategories(response)))
  }
}