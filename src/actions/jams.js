import axios from "axios";
import * as types from "./types";
import { serverUri } from "../utils/config";

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
