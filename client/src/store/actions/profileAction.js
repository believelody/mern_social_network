import axios from 'axios';
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  PROFILE_NOT_FOUND ,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  RESET_ERRORS
} from '../actions/constants';
import { resetErrors } from './errorAction';

//  Get All Profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile/all')
    .then(res => dispatch({
      type: GET_PROFILES,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_PROFILES,
      payload: null
    }));
}

//  Get a specific Profile by handle
export const getProfileByHandle = handle => dispatch => {
  console.log("by handle");
  dispatch(setProfileLoading());
  axios.get(`/api/profile/handle/${handle}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err => dispatch({
      type: GET_PROFILE,
      payload: null
    }));
}

//  Get a specific Profile by id
export const getProfileById = id => dispatch => {
  console.log("by id");
  dispatch(setProfileLoading());
  axios.get(`/api/profile/user/${id}`)
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_PROFILE,
      payload: null
    }));
}

//  Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile')
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_PROFILE,
      payload: null
    }))
}

export const setProfileLoading = () => ({ type: PROFILE_LOADING });

export const clearCurrentProfile = () => dispatch => dispatch({ type: CLEAR_CURRENT_PROFILE });

export const setProfile = (profileData, history) => dispatch => {
  dispatch(resetErrors());
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
}

export const addExperience = (expData, history) => dispatch => {
  dispatch(resetErrors());
  axios
    .post('api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
}

export const addEducation = (eduData, history) => dispatch => {
  dispatch(resetErrors());
  axios
    .post('api/profile/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
}

export const deleteExperience = (id) => dispatch =>
  axios
    .delete(`api/profile/experience/${id}`)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));

export const deleteEducation = (id) => dispatch =>
  axios
    .delete(`api/profile/education/${id}`)
    .then(res => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
