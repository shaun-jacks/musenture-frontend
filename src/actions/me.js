import axios from "axios";
import * as types from "./types";
import { serverUri } from "../utils/config";

export const fetchMe = () => {
  return {
    type: types.FETCH_ME
  };
};

export const fetchMeSuccess = me => {
  return {
    type: types.FETCH_ME_FULFILLED,
    payload: me
  };
};

export const fetchMeError = error => {
  return {
    type: types.FETCH_ME_REJECTED,
    payload: error
  };
};

export const handleFetchMe = () => {
  return async dispatch => {
    dispatch(fetchMe());
    // Make GET request to user by user id
    try {
      const res = await axios.get(`${serverUri}/users/me`);
      console.log(res);
      dispatch(fetchMeSuccess(res.data));
      dispatch(handleFetchMeJams(res.data.user.id));
    } catch (err) {
      console.log("Error requesting GET to server.", err);
      dispatch(fetchMeError(err));
    }
  };
};

export const fetchMeJams = () => {
  return {
    type: types.FETCH_ME_JAMS
  };
};

export const fetchMeJamsSuccess = (jam, userId) => {
  return {
    type: types.FETCH_ME_JAMS_FULFILLED,
    payload: jam,
    userId
  };
};

export const fetchMeJamsError = error => {
  return {
    type: types.FETCH_ME_JAMS_REJECTED,
    payload: error
  };
};

export const handleFetchMeJams = userId => {
  return async dispatch => {
    dispatch(fetchMeJams());
    // Make GET request to jam by id
    try {
      const serverUrl = `${serverUri}/jams/user/${userId}`;
      const res = await axios.get(serverUrl);
      console.log(res);
      dispatch(fetchMeJamsSuccess(res.data, userId));
    } catch (err) {
      console.log("Error requesting GET to server.", err);
      dispatch(fetchMeJamsError(err.message));
    }
  };
};
