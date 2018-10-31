import {ADD_POST, GET_POST, GET_POSTS, POST_LOADING, DELETE_POST, LIKE_POST} from '../actions/constants';

const initialState = {
  posts: [],
  post: {},
  loading: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload)
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      }
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      }
    case LIKE_POST:
      return {
        ...state,
        post: payload
      }
    default:
      return state;
  }
}
