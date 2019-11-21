import * as types from "../actions/types";

// Define initial state for user
const initialState = {
  user: {
    loading: false,
    error: null,
    followUserSuccess: false,
    amFollowing: false,
    user: {
      _id: "",
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
    fetchNewUsers: true,
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
          user: action.payload,
          amFollowing: action.payload.followers.some(
            follower => follower === action.authUserId
          )
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
          fetchNewUsers: true,
          loading: true
        }
      };
    case types.FETCH_USERS_FULFILLED:
      return {
        ...state,
        users: {
          ...state.users,
          loading: false,
          fetchNewUsers: false,
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
    case types.EDIT_PROFILE_FULFILLED:
      return {
        ...state,
        users: {
          ...state.users,
          fetchNewUsers: true
        }
      };
    case types.REGISTER_USER_FULFILLED:
      return {
        ...state,
        users: {
          ...state.users,
          fetchNewUsers: true
        }
      };
    case types.FETCH_USERS_REJECTED:
      return {
        ...state,
        users: {
          ...state.users,
          fetchNewUsers: true,
          error: action.payload
        }
      };
    case types.FOLLOW_USER:
      return {
        ...state,
        user: {
          ...state.user,
          loading: true,
          error: false,
          followUserSuccess: false
        }
      };
    case types.FOLLOW_USER_FULFILLED:
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          error: false,
          followUserSuccess: true,
          user: {
            ...state.user.user,
            followers: [...state.user.user.followers, { id: action.authUserId }]
          },
          amFollowing: true
        }
      };
    case types.FOLLOW_USER_REJECTED:
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          error: action.payload,
          followUserSuccess: false
        }
      };
    case types.UNFOLLOW_USER:
      return {
        ...state,
        user: {
          ...state.user,
          loading: true,
          error: false,
          followUserSuccess: false
        }
      };
    case types.UNFOLLOW_USER_FULFILLED:
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          error: false,
          followUserSuccess: false,
          user: {
            ...state.user.user,
            followers: state.user.user.followers.filter(
              follower => follower.id !== action.authUserId
            )
          },
          amFollowing: false
        }
      };
    case types.UNFOLLOW_USER_REJECTED:
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          error: action.payload,
          followUserSuccess: false
        }
      };
    case types.RESET_USER:
      return {
        ...state,
        user: {
          loading: false,
          error: null,
          followUserSuccess: false,
          amFollowing: false,
          user: {
            id: "",
            displayName: "",
            avatar: "",
            avatarLarge: "",
            bio: "",
            followers: [],
            following: []
          }
        }
      };

    default:
      return state;
  }
}
