import { SET_CURRENT_USER, VERIFY, VERIFIED } from '../actions/constants';
import isEmpty from '../../validations/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
  verify: null,
  verified: false
}


export default (state = initialState, {type, payload}) => {
    switch (type) {
      case VERIFIED:
        return {
          ...state,
          verified: true,
          verify: null
        }
      case VERIFY:
        return {
          ...state,
          verify: payload
        }
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(payload),
          user: payload
        }
      default:
        return state
    }
};
