import { API } from "../../types";
const uuidv4 = require("uuid/v4");

/*----------------------------*/
// Action Types
/*----------------------------*/
export const types = {
  FETCH_JAMS_BY_USER_ID_REQUEST: "USERS/FETCH_JAMS_BY_USER_ID_REQUEST",
  FETCH_JAMS_BY_USER_ID_SUCCESS: "USERS/FETCH_JAMS_BY_USER_ID_SUCCESS",
  FETCH_JAMS_BY_USER_ID_FAILURE: "USERS/FETCH_JAMS_BY_USER_ID_FAILURE",
  FETCH_JAMS_REQUEST: "USERS/FETCH_JAMS_REQUEST",
  FETCH_JAMS_SUCCESS: "USERS/FETCH_JAMS_SUCCESS",
  FETCH_JAMS_FAILURE: "USERS/FETCH_JAMS_FAILURE",
  FETCH_JAMS_AFTER_LOGIN_SUCCESS: "USERS/FETCH_JAMS_AFTER_LOGIN_SUCCESS"
};

/*----------------------------*/
// REDUCER
/*----------------------------*/

// State will look like this:
// {
//  byId: {
//   [id]: {
//     id,
//     displayName,
//     instruments: [array of instruments ids],
//     bio,
//     avatar,
//     avatarLarge
//   }
//  }
//  allIds: [],
// }
//

// Define initial state for users
const initialState = {
  loading: false,
  error: null,
  byId: {},
  allIds: []
};

// Define Reducer for users
export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_JAMS_BY_USER_ID_REQUEST:
    case types.FETCH_JAMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.FETCH_JAMS_BY_USER_ID_SUCCESS:
    case types.FETCH_JAMS_SUCCESS:
    case types.FETCH_JAMS_AFTER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        byId: action.payload.entities.jams.byId,
        allIds: Object.keys(action.payload.entities.jams.byId)
      };
    case types.FETCH_JAMS_BY_USER_ID_FAILURE:
    case types.FETCH_JAMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
/*----------------------------*/
/* Selectors                  */
/*----------------------------*/
export const getJams = state => {
  const allIds = state.index.entities.jams.allIds;
  return allIds.map(id => {
    return state.index.entities.jams.byId[id];
  });
};
export const getJamsByUserId = (userId, state) => {
  const { jams } = state.index.entities;
  const { allIds } = jams;
  const jamIds = allIds.filter(id => jams.byId[id].creator === userId);
  return jamIds.map(id => jams.byId[id]);
};

export const getJamsUserIsGoing = (userId, state) => {
  const { jams } = state.index.entities;
  const { allIds } = jams;
  console.log(allIds);
  const jamIds = allIds.filter(id => jams.byId[id].usersGoing.includes(userId));
  console.log(jamIds);
  return jamIds.map(id => jams.byId[id]);
};

/*----------------------------*/
/* Actions                    */
/*----------------------------*/
export const actions = {
  jamsByUserIdRequest: () => ({
    type: types.FETCH_JAMS_BY_USER_ID_REQUEST
  }),
  jamsByUserIdSuccess: payload => ({
    type: types.FETCH_JAMS_BY_USER_ID_SUCCESS,
    payload
  }),
  jamsByUserIdFailure: error => ({
    type: types.FETCH_JAMS_BY_USER_ID_FAILURE,
    payload: error
  }),
  jamsRequest: () => ({
    type: types.FETCH_JAMS_REQUEST
  }),
  jamsSuccess: payload => ({
    type: types.FETCH_JAMS_SUCCESS,
    payload
  }),
  jamsFailure: error => ({
    type: types.FETCH_JAMS_FAILURE,
    payload: error
  }),
  jamsLoginSuccess: payload => ({
    type: types.FETCH_JAMS_AFTER_LOGIN_SUCCESS,
    payload
  })
};
/*----------------------------*/
/* Tranform async responses   */
/*----------------------------*/
const transformJamsByUserIdAPI = data => {
  try {
    // Prepare data for jams.byId
    let jams = {
      byId: {}
    };
    data.forEach(jam => {
      jams.byId[jam._id] = {
        id: jam._id,
        createdAt: jam.createdAt,
        dateOfJam: jam.dateOfJam,
        genres: jam.genres,
        location: jam.location,
        updatedAt: jam.updatedAt,
        usersGoing: jam.usersGoing.map(user => user.userId),
        creator: jam.user.userId
      };
    });
    jams.allIds = Object.keys(jams.byId);
    console.log(jams);

    return {
      entities: {
        jams
      }
    };
  } catch (err) {
    throw new Error("Error normalizing response of jams");
  }
};

const transformJamsAPI = data => {
  try {
    console.log(data);
    return data;
  } catch (err) {
    throw new Error("Error normalizing response of jams");
  }
};

/*----------------------------*/
/* Async Actions              */
/*----------------------------*/
export const asyncActions = {
  fetchJamsByUserId: id => ({
    type: API,
    payload: {
      endpoint: `/jams/user/${id}`,
      method: "GET",
      data: {},
      transformResponse: transformJamsByUserIdAPI,
      onApiStart: actions.jamsByUserIdRequest,
      onSuccess: actions.jamsByUserIdSuccess,
      onFailure: actions.jamsByUserIdFailure
    }
  }),
  fetchJamsByUserIdAfterLogin: id => ({
    type: API,
    payload: {
      endpoint: `/jams/user/${id}`,
      method: "GET",
      data: {},
      transformResponse: transformJamsByUserIdAPI,
      onApiStart: actions.jamsByUserIdRequest,
      onSuccess: actions.jamsLoginSuccess, // This action ends login flow
      onFailure: actions.jamsByUserIdFailure
    }
  }),
  fetchJams: () => ({
    type: API,
    payload: {
      endpoint: `/jams`,
      method: "GET",
      data: {},
      transformResponse: transformJamsAPI,
      onApiStart: actions.jamsRequest,
      onSuccess: actions.jamsSuccess,
      onFailure: actions.jamsFailure
    }
  })
};
