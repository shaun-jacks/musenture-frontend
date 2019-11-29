import { API } from "../../types";
import { types as jamsTypes } from "../jams";
const uuidv4 = require("uuid/v4");

/*----------------------------*/
// Action Types
/*----------------------------*/
export const types = {
  FETCH_USER_REQUEST: "USERS/FETCH_USER_REQUEST",
  FETCH_USER_SUCCESS: "USERS/FETCH_USER_SUCCESS",
  FETCH_USER_FAILURE: "USERS/FETCH_USER_FAILURE",
  FETCH_USERS_REQUEST: "USERS/FETCH_USERS_REQUEST",
  FETCH_USERS_SUCCESS: "USERS/FETCH_USERS_SUCCESS",
  FETCH_USERS_FAILURE: "USERS/FETCH_USERS_FAILURE",
  FETCH_USER_AFTER_LOGIN_SUCCESS: "USERS/FETCH_USER_AFTER_LOGIN_SUCCESS",
  EDIT_USER_REQUEST: "USERS/EDIT_USER_REQUEST",
  EDIT_USER_SUCCESS: "USERS/EDIT_USER_SUCCESS",
  EDIT_USER_FAILURE: "USERS/EDIT_USER_FAILURE"
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
    case types.FETCH_USER_REQUEST:
    case types.FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.FETCH_USER_SUCCESS:
    case types.FETCH_USERS_SUCCESS:
    case types.FETCH_USER_AFTER_LOGIN_SUCCESS:
    case types.EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        byId: {
          ...state.byId,
          ...action.payload.entities.users
        },
        allIds: Object.keys({
          ...state.byId,
          ...action.payload.entities.users
        })
      };
    case types.FETCH_USER_FAILURE:
    case types.FETCH_USERS_FAILURE:
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
export const getUsers = state => {
  const allIds = state.entities.users.allIds.filter(id => id !== state.auth.id);
  return allIds.map(id => {
    return state.entities.users.byId[id];
  });
};
export const getUserById = (id, state) => {
  return state.entities.users.byId[id];
};

/*----------------------------*/
/* Actions                    */
/*----------------------------*/
export const actions = {
  userRequest: () => ({
    type: types.FETCH_USER_REQUEST
  }),
  userSuccess: payload => ({
    type: types.FETCH_USER_SUCCESS,
    payload
  }),
  userFailure: error => ({
    type: types.FETCH_USER_FAILURE,
    payload: error
  }),
  usersRequest: () => ({
    type: types.FETCH_USERS_REQUEST
  }),
  usersSuccess: payload => ({
    type: types.FETCH_USERS_SUCCESS,
    payload
  }),
  usersFailure: error => ({
    type: types.FETCH_USERS_FAILURE,
    payload: error
  }),
  userLoginSuccess: payload => ({
    type: types.FETCH_USER_AFTER_LOGIN_SUCCESS,
    payload
  }),
  editUserRequest: () => ({
    type: types.EDIT_USER_REQUEST
  }),
  editUserSuccess: payload => ({
    type: types.EDIT_USER_SUCCESS,
    payload
  }),
  editUserFailure: error => ({
    type: types.EDIT_USER_FAILURE,
    payload: error
  })
};
/*----------------------------*/
/* Tranform async responses   */
/*----------------------------*/
const transformUserAPI = data => {
  try {
    if (data.hasOwnProperty("error")) {
      throw new Error(data.error);
    }
    console.log(data);
    // Prepare data for usersFollowers Entity
    let usersFollowers = {};
    data.user.followers.forEach(follower => {
      const id = uuidv4();
      usersFollowers[id] = {
        id,
        userId: data.user.id,
        followerId: follower
      };
    });
    const hasFollowers = Object.keys(usersFollowers).length > 0;
    let payload = {
      entities: {
        users: {
          [data.user.id]: {
            id: data.user.id,
            displayName: data.user.displayName,
            bio: data.user.bio,
            avatar: data.user.avatar,
            avatarLarge: data.user.avatarLarge,
            instrument: data.user.instrument,
            jamsGoing: []
          }
        },
        usersFollowers: hasFollowers ? usersFollowers : {}
      }
    };
    return payload;
  } catch (err) {
    throw new Error("Error normalizing response of user");
  }
};

const transformUsersAPI = data => {
  try {
    if (data.hasOwnProperty("error")) {
      throw new Error(data.error);
    }
    console.log(data);
    let users = {};
    let usersFollowers = {};
    data.users.forEach(user => {
      // Prepare data for users entity
      users[user.id] = {
        id: user.id,
        displayName: user.displayName,
        bio: user.bio,
        avatar: user.avatar,
        avatarLarge: user.avatarLarge,
        instrument: user.instrument,
        jamsGoing: []
      };
      // Prepare data for usersFollowers entity
      const id = uuidv4();
      user.followers.forEach(follower => {
        console.log(follower);
        usersFollowers[id] = {
          id,
          userId: user.id,
          followerId: follower
        };
      });
    });
    const hasFollowers = Object.keys(usersFollowers).length > 0;
    const payload = {
      entities: {
        users,
        usersFollowers: hasFollowers ? usersFollowers : {}
      }
    };
    return payload;
  } catch (err) {
    throw new Error("Error normalizing response of users");
  }
};

const transformEditUserAPI = data => {
  try {
    if (data.hasOwnProperty("error")) {
      throw new Error(data.error);
    }
    console.log(data);

    return {
      entities: {
        users: {
          [data.id]: {
            id: data.id,
            displayName: data.displayName,
            bio: data.bio,
            avatar: data.avatar,
            avatarLarge: data.avatarLarge,
            instrument: data.instrument,
            jamsGoing: []
          }
        }
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
  fetchUser: id => ({
    type: API,
    payload: {
      endpoint: `/users/${id}`,
      method: "GET",
      data: {},
      transformResponse: transformUserAPI,
      onApiStart: actions.userRequest,
      onSuccess: actions.userSuccess,
      onFailure: actions.userFailure
    }
  }),
  fetchUserAfterLogin: id => ({
    type: API,
    payload: {
      endpoint: `/users/${id}`,
      method: "GET",
      data: {},
      transformResponse: transformUserAPI,
      onApiStart: actions.userRequest,
      onSuccess: actions.userLoginSuccess, // This action starts login flow
      onFailure: actions.userFailure
    }
  }),
  fetchUsers: () => ({
    type: API,
    payload: {
      endpoint: `/users`,
      method: "GET",
      data: {},
      transformResponse: transformUsersAPI,
      onApiStart: actions.usersRequest,
      onSuccess: actions.usersSuccess,
      onFailure: actions.usersFailure
    }
  }),
  editUser: ({ displayName, bio, instrument, skill }) => ({
    type: API,
    payload: {
      endpoint: `/users`,
      method: "PUT",
      data: { displayName, bio, instrument, skill },
      transformResponse: transformEditUserAPI,
      onApiStart: actions.editUserRequest,
      onSuccess: actions.editUserSuccess,
      onFailure: actions.editUserFailure
    }
  })
};
