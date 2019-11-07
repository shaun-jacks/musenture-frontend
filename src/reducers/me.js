import * as types from "../actions/types";

// Define initial state for user
const initialState = {
  loading: false,
  error: null,
  me: {
    user: { displayName: "", bio: "", skills: "", avatar: "" },
    jams: {
      loading: false,
      error: null,
      jams: {}
    }
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
    case types.FETCH_ME_JAMS:
      return {
        ...state,
        me: {
          ...state.me,
          jams: {
            ...state.me.jams,
            loading: true
          }
        }
      };
    case types.FETCH_ME_JAMS_FULFILLED:
      return {
        ...state,
        me: {
          ...state.me,
          jams: {
            ...state.me.jams,
            loading: false,
            jams: action.payload
          }
        }
      };
    case types.FETCH_ME_JAMS_REJECTED:
      return {
        ...state,
        me: {
          ...state.me,
          jams: {
            ...state.me.jams,
            loading: false,
            error: action.payload
          }
        }
      };
    default:
      return state;
  }
}
