import * as types from "../actions/types";

// Define initial state for user
const initialState = {
  isAuthenticated: false,
  loading: false,
  registerSuccess: false,
  loginSuccess: false,
  user: {},
  error: null
};

// Define Reducer for user
export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_USER:
      return {
        ...state,
        loginSuccess: false,
        loading: true,
        error: false
      };
    case types.LOGIN_USER_FULFILLED:
      return {
        ...state,
        isAuthenticated: true,
        loginSuccess: true,
        error: false,
        user: action.payload
      };
    case types.LOGIN_USER_REJECTED:
      return {
        ...state,
        loginSuccess: false,
        error: action.payload
      };
    case types.LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };
    case types.REGISTER_USER:
      return {
        ...state,
        registerSuccess: false,
        error: false,
        loading: true
      };
    case types.REGISTER_USER_FULFILLED:
      return {
        ...state,
        loading: false,
        error: false,
        registerSuccess: true
      };
    case types.REGISTER_USER_REJECTED:
      return {
        ...state,
        registerSuccess: false,
        loading: false,
        error: action.payload
      };
    case types.RESET_REGISTER_FORM:
      return {
        ...state,
        loading: false,
        error: null,
        registerSuccess: false
      };
    case types.RESET_LOGIN_FORM:
      return {
        ...state,
        loading: false,
        error: null,
        loginSuccess: false
      };
    default:
      return state;
  }
}
