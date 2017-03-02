import {
  RECEIVE_POSTS,
  RECEIVE_POST
} from 'actions/posts'

const INITIAL_POSTS_STATE = {
  postsList: {},
  postDetails: {}
}
const INITIAL_POSTS_LIST_STATE = {}
const INITIAL_POST_DETAILS_STATE = {}

function sortByPublish(data){
  if (data)
    return data.slice(0).sort(function(a, b) {
      return (
        new Date(a.publish).getTime() < new Date(b.publish).getTime()
      ) ? 1 : -1;
    });
  return data;
}

function postsList(state = INITIAL_POSTS_LIST_STATE, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        [action.page]: {
          ...action.posts,
          ['results']: sortByPublish(action.posts.results)
        }
      }
    default:
      return state
  }
}

function postDetails(state = INITIAL_POST_DETAILS_STATE, action) {
  switch (action.type) {
    /* post details get updated with info from posts list */
    case RECEIVE_POSTS:
      let postsObject = action.posts.results.reduce((a, post) => {
        postsObject = {
          ...postsObject,
          [post.slug]: {
            ...state[post.slug],
            ...post,
            ['page']: action.page
          }
        }
        return postsObject;
      });
      return { ...state, ...postsObject }
    case RECEIVE_POST:
      return {
        ...state,
        [action.post.slug]: {
          ...state[action.post.slug],
          ...action.post
        }
      }
    default:
      return state
  }
}

export function posts(state = INITIAL_POSTS_STATE, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        postsList: postsList(state.postsList, action),
        postDetails: postDetails(state.postDetails, action)
      }
      case RECEIVE_POST:
        return {
          ...state,
          postDetails: postDetails(state.postDetails, action)
        }
    default:
      return state
  }
}