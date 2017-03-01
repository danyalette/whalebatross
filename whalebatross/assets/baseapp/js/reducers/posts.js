import {
  BEGIN_GET_POSTS_REQUEST, RECEIVE_POSTS,
  BEGIN_GET_POST_REQUEST, RECEIVE_POST
} from 'actions/posts'

const INITIAL_POSTS_STATE = {
  isFetching: false,
  data: []
}

const INITIAL_POST_STATE = {
  isFetching: false
}

function sortByPublish(data){
  return data.slice(0).sort(function(a, b) {
    return (
      new Date(a.publish).getTime() < new Date(b.publish).getTime()
    ) ? 1 : -1;
  });
}


function postsReducer(action) {
  switch (action.type) {
    case BEGIN_GET_POSTS_REQUEST:
      return {
        isFetching: true
      }
    case RECEIVE_POSTS:
      return {
        isFetching: false,
        data: sortByPublish(action.posts)
      }
    default:
      return state
  }
}

function postReducer(state = INITIAL_POST_STATE, action) {
  switch (action.type) {
    case BEGIN_GET_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
        slug: action.slug
      }
    case RECEIVE_POST:
      return {
        ...state,
        isFetching: false,
        ...action.post
      }
    default:
      return state
  }
}

export function posts(state = INITIAL_POSTS_STATE, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case BEGIN_GET_POSTS_REQUEST:
      return {
        ...state,
        ...postsReducer(action)
      }
    case BEGIN_GET_POST_REQUEST:
    case RECEIVE_POST:
      const index = state.data.findIndex(item => item.slug === action.slug);
      let data = state.data.slice(0);
      if (index < 0) data = data.concat([ postReducer(null, action) ]);
      else data = [
        ...state.data.slice(0, index),
        postReducer(state.data[index], action),
        ...state.data.slice(index + 1)
      ]
      return {
        ...state,
        data: sortByPublish(data)
      }
    default:
      return state
  }
}