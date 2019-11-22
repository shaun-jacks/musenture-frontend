import { serverUri } from "../";
import { API } from "../../types";
/*----------------------------*/
// Action Types
/*----------------------------*/
export const types = {
  API_LOGIN: "API_LOGIN",
  LOGIN_REQUEST: "AUTH/LOGIN_REQUEST",
  LOGIN_SUCCESS: "AUTH/LOGIN_SUCCESS",
  LOGIN_FAILURE: "AUTH/LOGIN_FAILURE",
  LOGOUT: "AUTH/LOGOUT",
  REGISTER_REQUEST: "AUTH/REGISTER_REQUEST",
  REGISTER_SUCCESS: "AUTH/REGISTER_SUCCESS",
  REGISTER_FAILURE: "AUTH/REGISTER_FAILURE"
};

/*----------------------------*/
// REDUCER
/*----------------------------*/

// Define initial state for auth
const auth = {
  id: null,
  displayName: null,
  isLoading: false,
  error: null,
  accessToken: null
};

// Define Reducer for auth
export default (state = auth, action) => {
  switch (action.type) {
    case types.REGISTER_REQUEST:
    case types.LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };

    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
      return { ...state, isLoading: false, ...action.payload };

    case types.LOGIN_FAILURE:
    case types.REGISTER_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    case types.LOGOUT:
      return { ...state, user: null };

    default:
      return state;
  }
};

/*----------------------------*/
/* Actions                    */
/*----------------------------*/
export const actions = {
  registerRequest: () => ({
    type: types.REGISTER_REQUEST
  }),
  registerSuccess: user => ({
    type: types.REGISTER_SUCCESS,
    payload: user
  }),
  registerError: error => ({
    type: types.REGISTER_ERROR,
    payload: error
  }),
  loginRequest: () => ({
    type: types.LOGIN_REQUEST
  }),
  loginSuccess: user => ({
    type: types.LOGIN_SUCCESS,
    payload: user
  }),
  loginFailure: error => ({
    type: types.LOGIN_USER_FAILURE,
    payload: error
  })
};
/*----------------------------*/
/* Async Actions              */
/*----------------------------*/
export const asyncActions = {
  login: (email, password) => ({
    type: types.API_LOGIN,
    payload: {
      url: `/users/auth/local`,
      method: "POST",
      data: { email, password },
      onApiStart: actions.loginRequest,
      onSuccess: actions.loginSuccess,
      onFailure: actions.loginFailure
    }
  })
};
/*----------------------------*/
/* Tranform async responses   */
/*----------------------------*/
