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
    createJamSuccess: false,
    fetchNewJams: true,
    jamsByUserId: {},
    updatedAt: new Date().getTime(),
    cachedAt: new Date().getTime(),
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
    case types.FETCH_JAMS_CACHED_FULFILLED:
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
                action.authUserId &&
                jam.usersGoing.some(user => action.authUserId === user.userId),
              ...jam
            };
          })
        }
      };
    case types.FETCH_JAMS_FULFILLED:
      // translate array of jam objects into
      // an object with key of userId, and  value
      // and array of jams associated with that user id
      let jamsByUserIds = {};
      console.log(action.payload);
      console.log(action.userId);

      for (let key in action.payload) {
        let jam = action.payload[key];

        let userId = jam.user.userId;
        let tmpJam = {
          _id: jam._id,
          loading: false,
          error: null,
          going:
            action.userId &&
            jam.usersGoing.some(user => action.userId === user.userId),
          ...jam
        };
        if (userId in jamsByUserIds) {
          jamsByUserIds[userId].push(tmpJam);
        } else {
          jamsByUserIds[userId] = [tmpJam];
        }
      }
      console.log(jamsByUserIds);
      // We now have a jams object keyed by userId
      // Lets add the state variables to each jam

      return {
        ...state,
        jams: {
          ...state.jams,
          loading: false,
          fetchNewJams: false,
          cachedAt: new Date().getTime(),
          jamsByUserId: jamsByUserIds,
          jams: action.payload.map(jam => {
            return {
              _id: jam._id,
              loading: false,
              error: null,
              going:
                action.authUserId &&
                jam.usersGoing.some(user => action.authUserId === user.userId),
              ...jam
            };
          })
        }
      };
    case types.LOGOUT_USER:
      return {
        ...state,
        jams: {
          ...state.jams,
          updatedAt: new Date().getTime() // Since updated authenticated state info
        }
      };
    case types.FETCH_JAMS_BY_USER_ID_FULFILLED:
      return {
        ...state,
        jams: {
          ...state.jams,
          loading: false,
          fetchNewJams: true,
          jamsByUserId: {
            ...state.jamsByUserId,
            [action.userId]: action.payload.map(jam => {
              return {
                _id: jam._id,
                loading: false,
                error: null,
                going:
                  action.authUserId &&
                  jam.usersGoing.some(
                    user => action.authUserId === user.userId
                  ),
                ...jam
              };
            })
          }
        }
      };
    case types.FETCH_JAMS_BY_USER_CACHE_REJECTED:
      return {
        ...state,
        jams: {
          ...state.jams,
          error: action.payload,
          fetchNewJams: true
        }
      };
    case types.FETCH_JAMS_BY_USER_CACHE_FULFILLED:
      return {
        ...state,
        jams: {
          ...state.jams,
          loading: false,
          fetchNewJams: false
        }
      };
    case types.FETCH_JAMS_REJECTED:
      return {
        ...state,
        jams: {
          ...state.jams,
          fetchNewJams: true,
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
      const addUserToUsersGoing = jam => {
        return (
          // if the jam is equal to the jam joined
          jam._id === action.jam._id
            ? {
                ...jam,
                loading: false,
                // authenticated user is now going to this particular jam
                going: true,
                // if there are no cases where user logged in is one of the users going
                usersGoing: !jam.usersGoing.some(
                  user => user.userId === action.authenticatedUser.userId
                ) // add authenticated user to those going
                  ? [...jam.usersGoing, action.authenticatedUser]
                  : // otherwise the user logged in is already going
                    [...jam.usersGoing]
              }
            : // otherwise for all other jams, keep same
              jam
        );
      };
      return {
        ...state,
        jams: {
          ...state.jams,
          updatedAt: new Date().getTime(),
          // iterate through each jam
          jams: state.jams.jams.map(addUserToUsersGoing),
          // also update in jams by user id page
          jamsByUserId: {
            ...state.jams.jamsByUserId,
            [action.jam.user.userId]: [
              ...state.jams.jamsByUserId[action.jam.user.userId].map(
                addUserToUsersGoing
              )
            ]
          }
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
    // Update the jams "going" state if user logs in
    case types.LOGIN_USER_FULFILLED:
      return {
        ...state,
        jams: {
          ...state.jams,
          updatedAt: new Date().getTime()
        }
      };
    case types.CREATE_JAM:
      return {
        ...state,
        jams: {
          ...state.jams,
          loading: true,
          createJamSuccess: false,
          error: false
        }
      };
    case types.CREATE_JAM_REJECTED:
      return {
        ...state,
        jams: {
          ...state.jams,
          loading: false,
          createJamSuccess: false,
          error: action.payload
        }
      };
    case types.CREATE_JAM_FULFILLED:
      return {
        ...state,
        jams: {
          ...state.jams,
          loading: false,
          createJamSuccess: true,
          fetchNewJams: true,
          error: null,
          updatedAt: new Date().getTime(),
          jams: [...state.jams.jams, action.payload]
        }
      };
    case types.RESET_CREATE_JAM_FORM:
      return {
        ...state,
        jams: {
          ...state.jams,
          loading: false,
          createJamSuccess: false,
          error: null
        }
      };
    default:
      return state;
  }
}
