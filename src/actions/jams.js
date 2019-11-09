import axios from "axios";
import * as types from "./types";
import { serverUri } from "../utils/config";

// Fetch a single Jam by Jam Id
export const fetchJam = () => {
  return {
    type: types.FETCH_JAM
  };
};

export const fetchJamSuccess = jam => {
  return {
    type: types.FETCH_JAM_FULFILLED,
    payload: jam
  };
};

export const fetchJamError = error => {
  return {
    type: types.FETCH_JAM_REJECTED,
    payload: error
  };
};

export const handleFetchJam = jamId => {
  return async dispatch => {
    dispatch(fetchJam());
    // Make GET request to jam by id
    try {
      const serverUrl = `${serverUri}/jams/${jamId}`;
      const res = await axios.get(serverUrl);
      console.log(res);
      dispatch(fetchJamSuccess(res.data));
    } catch (err) {
      console.log("Error requesting GET to server.", err);
      dispatch(fetchJamError(err.message));
    }
  };
};

// Fetch all Jams
export const fetchJams = () => {
  return {
    type: types.FETCH_JAMS
  };
};

export const fetchJamsSuccess = jam => {
  return {
    type: types.FETCH_JAMS_FULFILLED,
    payload: jam
  };
};

export const fetchJamsError = error => {
  return {
    type: types.FETCH_JAMS_REJECTED,
    payload: error
  };
};

export const handleFetchJams = () => {
  return async dispatch => {
    dispatch(fetchJams());
    // Make GET request to jam by id
    try {
      const serverUrl = `${serverUri}/jams`;
      const res = await axios.get(serverUrl);
      console.log(res);
      dispatch(fetchJamsSuccess(res.data));
    } catch (err) {
      console.log("Error requesting GET to server.", err);
      dispatch(fetchJamsError(err.message));
    }
  };
};
