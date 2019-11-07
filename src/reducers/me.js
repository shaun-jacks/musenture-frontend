import * as types from "../actions/types";

// Define initial state for user
const initialState = {
  loading: false,
  error: null,
  me: {
    user: { displayName: "", bio: "", skills: "", avatar: "" }
  }
};

// Define Reducer for user
export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ME:
      return {
        ...state,
        loading: true
      };
    case types.FETCH_ME_FULFILLED:
      return {
        ...state,
        loading: false,
        me: action.payload
      };
    case types.FETCH_ME_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
