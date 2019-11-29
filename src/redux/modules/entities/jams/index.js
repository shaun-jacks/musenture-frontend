import { API } from "../../types";
const uuidv4 = require("uuid/v4");

/*----------------------------*/
// Action Types
/*----------------------------*/
export const types = {
  FETCH_JAMS_BY_USER_ID_REQUEST: "JAMS/FETCH_JAMS_BY_USER_ID_REQUEST",
  FETCH_JAMS_BY_USER_ID_SUCCESS: "JAMS/FETCH_JAMS_BY_USER_ID_SUCCESS",
  FETCH_JAMS_BY_USER_ID_FAILURE: "JAMS/FETCH_JAMS_BY_USER_ID_FAILURE",
  FETCH_JAMS_REQUEST: "JAMS/FETCH_JAMS_REQUEST",
  FETCH_JAMS_SUCCESS: "JAMS/FETCH_JAMS_SUCCESS",
  FETCH_JAMS_FAILURE: "JAMS/FETCH_JAMS_FAILURE",
  FETCH_JAMS_AFTER_LOGIN_SUCCESS: "JAMS/FETCH_JAMS_AFTER_LOGIN_SUCCESS",
  CREATE_JAM_REQUEST: "JAMS/CREATE_JAM_REQUEST",
  CREATE_JAM_SUCCESS: "JAMS/CREATE_JAM_SUCCESS",
  CREATE_JAM_FAILURE: "JAMS/CREATE_JAM_FAILURE"
};

/*----------------------------*/
// REDUCER
/*----------------------------*/

// State will look like this:
// {
//  byId: {
//   [id]: {
//     id,
//     title,
//     description
//     location,
//     dateOfJam,
//     genres,
//     avatar
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
    case types.CREATE_JAM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        byId: { ...state.byId, ...action.payload.entities.jams.byId },
        allIds: Object.keys({
          ...state.byId,
          ...action.payload.entities.jams.byId
        })
      };
    case types.FETCH_JAMS_BY_USER_ID_FAILURE:
    case types.FETCH_JAMS_FAILURE:
    case types.CREATE_JAM_FAILURE:
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
  const allIds = state.entities.jams.allIds;
  return allIds.map(id => {
    return state.entities.jams.byId[id];
  });
};
export const getJamsByUserId = (userId, state) => {
  const { jams } = state.entities;
  const { allIds } = jams;
  const jamIds = allIds.filter(id => jams.byId[id].creator === userId);
  return jamIds.map(id => jams.byId[id]);
};

export const getJamsUserIsGoing = (userId, state) => {
  const { jams } = state.entities;
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
  }),
  createJamRequest: () => ({
    type: types.CREATE_JAM_REQUEST
  }),
  createJamSuccess: payload => ({
    type: types.CREATE_JAM_SUCCESS,
    payload
  }),
  createJamFailure: error => ({
    type: types.CREATE_JAM_FAILURE,
    payload: error
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
    // Prepare data for jams.byId, jams.allIds
    let jams = {
      byId: {},
      allIds: []
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

const transformCreateJamAPI = data => {
  try {
    console.log(data);
    const jam = data;
    const jams = {
      byId: {},
      allIds: []
    };
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
    return {
      entities: {
        jams
      }
    };
  } catch (err) {
    console.log(err);
    throw new Error(err);
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
  }),
  createJam: ({
    location,
    genres,
    description,
    title,
    dateOfJam,
    userAvatar
  }) => ({
    type: API,
    payload: {
      endpoint: `/jams`,
      method: "POST",
      data: { location, genres, description, title, dateOfJam, userAvatar },
      transformResponse: transformCreateJamAPI,
      onApiStart: actions.createJamRequest,
      onSuccess: actions.createJamSuccess,
      onFailure: actions.createJamFailure
    }
  })
};
