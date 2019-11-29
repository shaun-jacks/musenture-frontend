import { serverUri } from "../";
import { API } from "../../types";
import setAuthToken from "../../../../utils/auth";
import jwt_decode from "jwt-decode";
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
const initialState = {
  id: null,
  displayName: null,
  isLoading: false,
  error: null,
  accessToken: null
};

// Define Reducer for auth
export default (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_REQUEST:
    case types.LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };

    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
      return { ...state, isLoading: false, ...action.payload };

    case types.LOGIN_FAILURE:
    case types.REGISTER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case types.LOGOUT:
      return { ...state, ...initialState };

    default:
      return state;
  }
};

export const getAuth = state => state.auth;

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
    type: types.REGISTER_FAILURE,
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
    type: types.LOGIN_FAILURE,
    payload: error
  }),
  logout: () => ({
    type: types.LOGOUT
  })
};
/*----------------------------*/
/* Tranform async responses   */
/*----------------------------*/
const transformLoginAPI = data => {
  try {
    const accessToken = data;
    const user = jwt_decode(accessToken);
    return { ...user, accessToken };
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

/*----------------------------*/
/* Async Actions              */
/*----------------------------*/
export const asyncActions = {
  login: (email, password) => ({
    type: API,
    payload: {
      endpoint: `/users/auth/local`,
      method: "POST",
      data: { email, password },
      transformResponse: transformLoginAPI,
      onApiStart: actions.loginRequest,
      onSuccess: actions.loginSuccess,
      onFailure: actions.loginFailure
    }
  })
};
