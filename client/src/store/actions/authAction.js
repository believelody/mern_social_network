import { GET_ERRORS, SET_CURRENT_USER } from './constants';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';

// Set Logged in User
export const setCurrentUser = (decoded) => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

//  Register User
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
}

//  Login - Get User Token
export const loginUser = userData => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      //  Set token to LocalStorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      //  Set token to Auth header
      setAuthToken(token);
      //  Decode token to get user data
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
}

//  Log user out
export const logoutUser = () => dispatch => {
  //  Remove token from LocalStorage
  localStorage.removeItem('jwtToken');
  //  Remove auth header for future requests
  setAuthToken(false);
  //  Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
}
