import { types as userTypes } from "../users";

/*----------------------------*/
// Action Types
/*----------------------------*/
export const types = {};

/*----------------------------*/
// REDUCER
/*----------------------------*/

// State will look like this:
// {
//   [id]: {
//     id,
//     userId,
//     followerId
//   }
// }

// Define initial state for usersFollowers
const initialState = {
  loading: false,
  error: null,
  byId: {},
  allIds: []
};

// Define Reducer for usersFollowers
export default (state = initialState, action) => {
  switch (action.type) {
    case userTypes.FETCH_USER_SUCCESS:
    case userTypes.FETCH_USERS_SUCCESS:
    case userTypes.FETCH_USER_AFTER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        byId: action.payload.entities.usersFollowers,
        allIds: Object.keys(action.payload.entities.usersFollowers)
      };

    default:
      return state;
  }
};
/*----------------------------*/
/* Selectors                  */
/*----------------------------*/
export const getFollowersByUserId = (userId, state) => {
  const allFollowerIds = state.index.entities.usersFollowers.allIds;
  if (allFollowerIds.length === 0) {
    return [];
  }
  // Get all user ids that a specific user follows
  let followers = allFollowerIds.filter(id => {
    return state.index.entities.usersFollowers.byId[id].userId === userId;
  });
  return followers;
};

export const getFollowingByUserId = (userId, state) => {
  const allFollowerIds = state.index.entities.usersFollowers.allIds;
  if (allFollowerIds.length === 0) {
    return [];
  }
  // Get all user ids that are following an id
  let followees = allFollowerIds.filter(id => {
    return state.index.entities.usersFollowers.byId[id].followerId === userId;
  });
  return followees;
};

/*----------------------------*/
/* Actions                    */
/*----------------------------*/
export const actions = {};
/*----------------------------*/
/* Tranform async responses   */
/*----------------------------*/

/*----------------------------*/
/* Async Actions              */
/*----------------------------*/
export const asyncActions = {};
