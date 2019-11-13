import * as types from "../actions/types";

// Define initial state for user
const initialState = {
  user: {
    loading: false,
    error: null,
    user: {
      id: "",
      displayName: "",
      avatar: "",
      avatarLarge: "",
      bio: "",
      followers: [],
      following: []
    }
  },
  users: {
    loading: false,
    error: null,
    users: [
      {
        _id: "",
        loading: false,
        error: null,
        userId: "",
        displayName: "",
        avatar: "",
        instrument: ""
      }
    ]
  }
};

// Define Reducer for users
export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_USER:
      return {
        ...state,
        user: {
          ...state.jam,
          loading: true
        }
      };
    case types.FETCH_USER_FULFILLED:
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          user: action.payload
        }
      };
    case types.FETCH_USER_REJECTED:
      return {
        ...state,
        user: {
          ...state.user,
          error: action.payload
        }
      };
    case types.FETCH_USERS:
      return {
        ...state,
        users: {
          ...state.users,
          loading: true
        }
      };
    case types.FETCH_USERS_FULFILLED:
      return {
        ...state,
        users: {
          ...state.users,
          loading: false,
          users: action.payload.map(user => {
            return {
              loading: false,
              error: null,
              _id: user._id,
              displayName: user.displayName,
              avatar: user.avatar,
              instrument: user.instrument
            };
          })
        }
      };
    case types.FETCH_USERS_REJECTED:
      return {
        ...state,
        users: {
          ...state.users,
          error: action.payload
        }
      };

    default:
      return state;
  }
}
