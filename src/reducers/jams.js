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
    jams: [
      {
        _id: "",
        loading: false,
        error: null,
        joined: false,
        user: {
          userId: "",
          displayName: "",
          avatar: ""
        },
        title: "",
        location: "",
        genres: [],
        description: "",
        dateOfJam: "",
        usersGoing: []
      }
    ]
  }
};

// Define Reducer for jams
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
          jams: action.payload.map(jam => {
            return {
              _id: jam._id,
              loading: false,
              error: null,
              going:
                action.userId &&
                jam.usersGoing.some(user => action.userId === user.userId),
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
      };
    case types.FETCH_JAMS_REJECTED:
      return {
        ...state,
        jams: {
          ...state.jams,
          error: action.payload
        }
      };
    case types.JOIN_JAM:
      return {
        ...state,
        jams: {
          ...state.jams,
          jams: state.jams.jams.map(jam =>
            jam._id === action.jamId ? { ...jam, loading: true } : jam
          )
        }
      };
    case types.JOIN_JAM_FULFILLED:
      return {
        ...state,
        jams: {
          ...state.jams,
          jams: state.jams.jams.map(jam =>
            jam._id === action.jamId
              ? {
                  ...jam,
                  loading: false,
                  going: true,
                  usersGoing: jam.usersGoing.some(
                    user => user.userId === action.user.userId
                  )
                    ? jam.usersGoing.map(user => {
                        if (user.userId === action.user.userId) {
                          return {
                            ...user,
                            userId: action.user.userId,
                            displayName: action.user.displayName
                          };
                        } else {
                          return {
                            user
                          };
                        }
                      })
                    : [...jam.usersGoing, action.user]
                }
              : jam
          )
        }
      };
    case types.JOIN_JAM_REJECTED:
      return {
        ...state,
        jams: {
          ...state.jams,
          jams: state.jams.jams.map(jam =>
            jam._id === action.jamId
              ? { ...jam, loading: false, error: action.payload }
              : jam
          )
        }
      };
    default:
      return state;
  }
}
