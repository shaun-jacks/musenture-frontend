import { API } from "../../types";
/*----------------------------*/
// Action Types
/*----------------------------*/
export const types = {
  FETCH_USER_REQUEST: "USERS/FETCH_USER_REQUEST",
  FETCH_USER_SUCCESS: "USERS/FETCH_USER_SUCCESS",
  FETCH_USER_FAILURE: "USERS/FETCH_USER_FAILURE",
  FETCH_USERS_REQUEST: "USERS/FETCH_USERS_REQUEST",
  FETCH_USERS_SUCCESS: "USERS/FETCH_USERS_SUCCESS",
  FETCH_USERS_FAILURE: "USERS/FETCH_USERS_FAILURE"
};

/*----------------------------*/
// REDUCER
/*----------------------------*/

// State will look like this:
// {
//   [id]: {
//     id,
//     displayName,
//     instruments: [array of instruments ids],
//     bio,
//     avatar,
//     avatarLarge
//   }
// }

// Define initial state for users
const initialState = {
  loading: false,
  error: null
};

// Define Reducer for users
export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        [action.payload.id]: {
          ...action.payload
        }
      };
    case types.FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        ...action.payload
      };
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
/* Actions                    */
/*----------------------------*/
export const actions = {
  userRequest: () => ({
    type: types.FETCH_USER_REQUEST
  }),
  userSuccess: user => ({
    type: types.FETCH_USER_SUCCESS,
    payload: user
  }),
  userFailure: error => ({
    type: types.FETCH_USER_FAILURE,
    payload: error
  }),
  usersRequest: () => ({
    type: types.FETCH_USERS_REQUEST
  }),
  usersSuccess: users => ({
    type: types.FETCH_USERS_SUCCESS,
    payload: users
  }),
  usersFailure: error => ({
    type: types.FETCH_USERS_FAILURE,
    payload: error
  })
};
/*----------------------------*/
/* Tranform async responses   */
/*----------------------------*/
// const transformUserAPI = data => {
//   try {
//     const accessToken = data;
//     const user = jwt_decode(accessToken);
//     return { ...user, accessToken };
//   } catch (err) {
//     throw new Error("Invalid token from server.");
//   }
// };

const transformUsersAPI = data => {
  try {
    console.log(data.users);
    let users = {};
    data.users.forEach(user => {
      users[user.id] = {
        ...user
      };
    });
    return users;
  } catch (err) {
    throw new Error("Error normalizing response of users");
  }
};

/*----------------------------*/
/* Async Actions              */
/*----------------------------*/
export const asyncActions = {
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
  })
};
