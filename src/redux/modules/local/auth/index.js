import { serverUri } from "../";
import { API } from "../../types";
import setAuthToken from "../../../../utils/auth";
import jwt_decode from "jwt-decode";
import { transformUserAPI } from "../../entities/users";
/*----------------------------*/
// Action Types
/*----------------------------*/
export const types = {
  API_LOGIN: "API_LOGIN",
  LOGIN_REQUEST: "AUTH/LOGIN_REQUEST",
  LOGIN_SUCCESS: "AUTH/LOGIN_SUCCESS",
  LOGIN_FAILURE: "AUTH/LOGIN_FAILURE",
  LOGOUT: "AUTH/LOGOUT",
  REGISTER_USER_REQUEST: "AUTH/REGISTER_USER_REQUEST",
  REGISTER_USER_SUCCESS: "AUTH/REGISTER_USER_SUCCESS",
  REGISTER_USER_FAILURE: "AUTH/REGISTER_USER_FAILURE"
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
  accessToken: null,
  registerSuccess: null,
  loginSuccess: null
};

// Define Reducer for auth
export default (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_USER_REQUEST:
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        loginSuccess: null,
        registerSuccess: null,
        error: null
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loginSuccess: true,
        ...action.payload
      };
    case types.REGISTER_USER_SUCCESS:
      return { ...state, isLoading: false, registerSuccess: true };

    case types.LOGIN_FAILURE:
    case types.REGISTER_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        loginSuccess: null,
        registerSuccess: null
      };

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
  }),
  registerUserRequest: () => ({
    type: types.REGISTER_USER_REQUEST
  }),
  registerUserSuccess: payload => ({
    type: types.REGISTER_USER_SUCCESS,
    payload
  }),
  registerUserFailure: error => ({
    type: types.REGISTER_USER_FAILURE,
    payload: error
  })
};
/*----------------------------*/
/* Tranform async responses   */
/*----------------------------*/
const transformLoginAPI = data => {
  try {
    if (data.hasOwnProperty("error")) {
      throw new Error(data.error);
    }
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
  }),
  registerUser: ({ email, displayName, password, password2 }) => ({
    type: API,
    payload: {
      endpoint: `/users/auth/register`,
      method: "POST",
      data: { email, displayName, password, password2 },
      transformResponse: transformUserAPI,
      onApiStart: actions.registerUserRequest,
      onSuccess: actions.registerUserSuccess,
      onFailure: actions.registerUserFailure
    }
  })
};
