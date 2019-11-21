import axios from "axios";
import * as types from "./types";
import { serverUri } from "../utils/config";

// Fetch a single user by user Id
export const fetchUser = () => {
  return {
    type: types.FETCH_USER
  };
};

export const fetchUserSuccess = (user, authUserId = null) => {
  return {
    type: types.FETCH_USER_FULFILLED,
    payload: user,
    authUserId
  };
};

export const fetchUserError = error => {
  return {
    type: types.FETCH_USER_REJECTED,
    payload: error
  };
};

export const handleFetchUser = (userId, authUserId = null) => {
  return async dispatch => {
    dispatch(fetchUser());
    // Make GET request to user by id
    try {
      const serverUrl = `${serverUri}/users/${userId}`;
      const res = await axios.get(serverUrl);
      console.log(res);
      dispatch(fetchUserSuccess(res.data.user, authUserId));
    } catch (err) {
      console.log("Error requesting GET to server.", err);
      dispatch(fetchUserError(err.message));
    }
  };
};

// Fetch all users
export const fetchUsers = () => {
  return {
    type: types.FETCH_USERS
  };
};

export const fetchUsersSuccess = (users, authUserId = "") => {
  return {
    type: types.FETCH_USERS_FULFILLED,
    payload: users,
    authUserId
  };
};

export const fetchUsersError = error => {
  return {
    type: types.FETCH_USERS_REJECTED,
    payload: error
  };
};

export const handleFetchUsers = () => {
  return async (dispatch, getState) => {
    dispatch(fetchUsers());
    // Check if user is authenticated, if so, authUserId exists
    const { isAuthenticated } = getState().auth;
    let authUserId = "";
    if (isAuthenticated) {
      authUserId = getState().auth.user.id;
    }
    // GET to server for all users
    try {
      const serverUrl = `${serverUri}/users`;
      const res = await axios.get(serverUrl);
      console.log(res);
      dispatch(fetchUsersSuccess(res.data.users, authUserId));
    } catch (err) {
      console.log("Error requesting GET to server.", err);
      dispatch(fetchUsersError(err.response));
    }
  };
};

export const followUser = () => {
  return {
    type: types.FOLLOW_USER
  };
};

export const followUserSuccess = (message, authUserId = "") => {
  return {
    type: types.FOLLOW_USER_FULFILLED,
    payload: message,
    authUserId
  };
};

export const followUserError = error => {
  return {
    type: types.FOLLOW_USER_REJECTED,
    payload: error
  };
};

export const handleFollowUser = (userId, authUserId = "") => {
  return async dispatch => {
    dispatch(followUser());
    // GET to server for all users
    try {
      const serverUrl = `${serverUri}/users/follow/`;
      console.log(serverUrl);
      const res = await axios.post(serverUrl, { toId: userId });
      console.log(res);
      dispatch(followUserSuccess(res.data.msg, authUserId));
    } catch (err) {
      console.log(err);
      console.log("Error requesting GET to server.", err);
      dispatch(followUserError(err.response));
    }
  };
};

export const unfollowUser = () => {
  return {
    type: types.UNFOLLOW_USER
  };
};

export const unfollowUserSuccess = (message, authUserId = "", toUserId) => {
  return {
    type: types.UNFOLLOW_USER_FULFILLED,
    payload: message,
    authUserId,
    toUserId
  };
};

export const unfollowUserError = error => {
  return {
    type: types.UNFOLLOW_USER_REJECTED,
    payload: error
  };
};

export const handleUnfollowUser = (userId, authUserId = "") => {
  return async dispatch => {
    dispatch(unfollowUser());
    // GET to server for all users
    try {
      const serverUrl = `${serverUri}/users/unfollow/`;
      console.log(serverUrl);
      const res = await axios.post(serverUrl, { toId: userId });
      console.log(res);
      dispatch(unfollowUserSuccess(res.data.msg, authUserId, userId));
    } catch (err) {
      console.log(err);
      console.log("Error requesting POST unfollow to server.", err);
      dispatch(unfollowUserError(err.response));
    }
  };
};

export const resetUser = () => {
  return {
    type: types.RESET_USER
  };
};
