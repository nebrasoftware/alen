import { userConstants } from '../_constants';

let auth = JSON.parse(localStorage.getItem('auth'));
const initialState = auth ? { loggedIn: true, auth } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        auth: action.auth
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        auth: action.auth
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}