import * as types from "../actions/types";

// Define initial state for user
const initialState = {
  loading: false,
  error: null,
  editProfileSuccess: false,
  me: {
    loading: false,
    error: null,
    editProfileSuccess: false,
    cachedAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    user: {
      id: "",
      displayName: "",
      bio: "",
      skills: "",
      avatar: "",
      avatarLarge: "",
      followers: [],
      following: []
    },
    showModal: false,
    showEditModal: false,
    jams: {
      cachedAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      loading: false,
      error: null,
      jams: [{ user: { userId: "" } }]
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
        me: {
          ...state.me,
          cachedAt: new Date().getTime(),
          user: action.payload.user
        }
      };
    case types.FETCH_ME_CACHED_FULFILLED:
      return {
        ...state,
        loading: false
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
    case types.FETCH_ME_JAMS_CACHED_FULFILLED:
      return {
        ...state,
        me: {
          ...state.me,
          jams: {
            ...state.me.jams,
            loading: false
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
            cachedAt: new Date().getTime(),
            jams:
              action.payload.length > 0
                ? action.payload.map(jam => {
                    return {
                      _id: jam._id,
                      loading: false,
                      error: null,
                      going: jam.usersGoing.some(
                        user => action.authUserId === user.userId
                      ),
                      ...jam
                    };
                  })
                : initialState.me.jams.jams
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
    case types.SHOW_ME_MODAL:
      return {
        ...state,
        me: {
          ...state.me,
          showModal: true
        }
      };
    case types.CLOSE_ME_MODAL:
      return {
        ...state,
        me: {
          ...state.me,
          showModal: false
        }
      };
    case types.SHOW_EDIT_ME_MODAL:
      return {
        ...state,
        me: {
          ...state.me,
          showEditModal: true
        }
      };
    case types.CLOSE_EDIT_ME_MODAL:
      return {
        ...state,
        me: {
          ...state.me,
          showEditModal: false
        }
      };
    case types.FOLLOW_USER_FULFILLED:
      return {
        ...state,
        me: {
          ...state.me,
          updatedAt: new Date().getTime(),
          user: {
            ...state.me.user,
            following: [...state.me.user.following, action.authUserId]
          }
        }
      };
    case types.UNFOLLOW_USER_FULFILLED:
      return {
        ...state,
        me: {
          ...state.me,
          updatedAt: new Date().getTime(),
          user: {
            ...state.me.user,
            following: state.me.user.following.filter(
              following => following !== action.toUserId
            )
          }
        }
      };
    case types.EDIT_PROFILE:
      return {
        ...state,
        me: {
          ...state.me,
          loading: true,
          error: false,
          editProfileSuccess: false
        }
      };
    case types.EDIT_PROFILE_FULFILLED:
      return {
        ...state,
        me: {
          ...state.me,
          loading: false,
          error: false,
          updatedAt: new Date().getTime(),
          editProfileSuccess: true,
          user: {
            ...state.me.user,
            displayName: action.displayName,
            bio: action.bio,
            instrument: action.instrument
          }
        }
      };
    case types.EDIT_PROFILE_REJECTED:
      return {
        ...state,
        me: {
          ...state.me,
          loading: false,
          error: action.payload,
          editProfileSuccess: false
        }
      };
    case types.RESET_EDIT_PROFILE_FORM:
      return {
        ...state,
        me: {
          ...state.me,
          loading: false,
          error: null,
          editProfileSuccess: false
        }
      };
    default:
      return state;
  }
}
