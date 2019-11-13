import * as types from "../actions/types";

// Define initial state for user
const initialState = {
  loading: false,
  error: null,
  me: {
    user: {
      displayName: "",
      bio: "",
      skills: "",
      avatar: "",
      avatarLarge: "",
      followers: [],
      following: []
    },
    showModal: false,
    jams: {
      loading: false,
      error: null,
      jams: []
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
          user: action.payload.user
        }
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
            jams: action.payload.map(jam => {
              return {
                _id: jam._id,
                loading: false,
                error: null,
                going: jam.usersGoing.some(
                  user => action.userId === user.userId
                ),
                user: {
                  userId: jam.user.userId,
                  displayName: jam.user.displayName,
                  avatar: jam.user.avatar
                },
                title: jam.title,
                location: jam.location,
                genres: jam.genres,
                description: jam.description,
                dateOfJam: jam.dateOfJam,
                usersGoing: jam.usersGoing
              };
            })
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
    default:
      return state;
  }
}
