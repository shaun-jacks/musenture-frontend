import axios from "axios";
import * as types from "./types";

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

export const handleFetchMe = serverUrl => {
  return async dispatch => {
    dispatch(fetchMe());
    // Make GET request to user by user id
    try {
      console.log(serverUrl);
      const res = await axios.get(serverUrl);
      console.log(res);
      dispatch(fetchMeSuccess(res.data));
    } catch (err) {
      console.log("Error requesting GET to server.", err);
      dispatch(fetchMeError(err));
    }
  };
};
