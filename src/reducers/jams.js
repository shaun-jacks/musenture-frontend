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
          jamsByUserId: jamsByUserIds,
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
    case types.FETCH_JAMS_BY_USER_ID_FULFILLED:
      return {
        ...state,
        jams: {
          ...state.jams,
          loading: false,
          fetchNewJams: true,
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
