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

export const fetchJamsSuccess = (jams, userId = "") => {
  return {
    type: types.FETCH_JAMS_FULFILLED,
    payload: jams,
    userId
  };
};

export const fetchJamsError = error => {
  return {
    type: types.FETCH_JAMS_REJECTED,
    payload: error
  };
};

export const handleFetchJams = userId => {
  return async dispatch => {
    dispatch(fetchJams());
    // Make GET request to jam by id
    try {
      const serverUrl = `${serverUri}/jams`;
      const res = await axios.get(serverUrl);
      console.log(res);
      dispatch(fetchJamsSuccess(res.data, userId));
    } catch (err) {
      console.log("Error requesting GET to server.", err);
      dispatch(fetchJamsError(err.message));
    }
  };
};

// Fetch all Jams
export const joinJam = jamId => {
  return {
    type: types.JOIN_JAM,
    jamId
  };
};

export const joinJamSuccess = (jamId, user) => {
  return {
    type: types.JOIN_JAM_FULFILLED,
    jamId,
    user
  };
};

export const joinJamError = (jamId, error) => {
  return {
    type: types.JOIN_JAM_REJECTED,
    payload: error,
    jamId
  };
};

export const handleJoinJam = jamId => {
  return async dispatch => {
    console.log("Called!");
    dispatch(joinJam(jamId));
    // make POST request to jams/join/{jamId}
    try {
      const serverUrl = `${serverUri}/jams/join/${jamId}`;
      const res = await axios.post(serverUrl);
      console.log(res);
      dispatch(joinJamSuccess(jamId, res.data));
    } catch (err) {
      console.log("Error requesting GET to server.", err);
      dispatch(joinJamError(jamId, err.message));
    }
  };
};
