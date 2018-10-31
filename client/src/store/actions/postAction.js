import axios from 'axios';
import { ADD_POST, GET_ERRORS, GET_POST, GET_POSTS, POST_LOADING, DELETE_POST, LIKE_POST } from './constants';

export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts`)
    .then(res => dispatch({
      type: GET_POSTS,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res => dispatch({
      type: GET_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}
export const addPost = postData => dispatch =>
  axios
    .post('/api/posts', postData)
    .then(res => dispatch({
      type: ADD_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));

export const setPostLoading = () => ({ type: POST_LOADING });

export const deletePost = postId => dispatch =>
  axios
    .delete(`/api/posts/${postId}`)
    .then(res => dispatch({
      type: DELETE_POST,
      payload: postId
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))

export const likePost = (postId) => dispatch =>
  axios
    .post(`/api/posts/like/${postId}`)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));

export const postComment = (postId, data) => dispatch =>
  axios
    .post(`/api/posts/comment/${postId}`, data)
    .then(res => dispatch(getPost(postId)))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));

export const deleteComment = (postId, commentId) => dispatch =>
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res => dispatch(getPost(postId)))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
