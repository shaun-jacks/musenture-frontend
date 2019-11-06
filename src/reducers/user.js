import * as types from "../actions/types";

// Define initial state for user
const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {},
  error: null
};

// Define Reducer for user
export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_USER:
      return {
        ...state,
        loading: true
      };
    case types.LOGIN_USER_FULFILLED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case types.LOGIN_USER_REJECTED:
      return {
        ...state,
        error: action.payload
      };
    case types.LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
}
