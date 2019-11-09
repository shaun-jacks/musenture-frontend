import * as types from "../actions/types";

// Define initial state for user
const initialState = {
  jam: {
    loading: false,
    error: null,
    jam: {}
  },
  jams: {
    loading: false,
    error: null,
    jams: []
  }
};

// Define Reducer for user
export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_JAM:
      return {
        ...state,
        jam: {
          ...state.jam,
          loading: true
        }
      };
    case types.FETCH_JAM_FULFILLED:
      return {
        ...state,
        jam: {
          ...state.jam,
          loading: false,
          jam: action.payload
        }
      };
    case types.FETCH_JAM_REJECTED:
      return {
        ...state,
        jam: {
          ...state.jam,
          error: action.payload
        }
      };
    case types.FETCH_JAMS:
      return {
        ...state,
        jams: {
          ...state.jams,
          loading: true
        }
      };
    case types.FETCH_JAMS_FULFILLED:
      return {
        ...state,
        jams: {
          ...state.jams,
          loading: false,
          jams: action.payload
        }
      };
    case types.FETCH_JAMS_REJECTED:
      return {
        ...state,
        jams: {
          ...state.jams,
          error: action.payload
        }
      };
    default:
      return state;
  }
}
