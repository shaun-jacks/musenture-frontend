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

export const fetchJamsSuccess = (jams, authUserId = "") => {
  return {
    type: types.FETCH_JAMS_FULFILLED,
    payload: jams,
    authUserId
  };
};

export const fetchJamsError = error => {
  return {
    type: types.FETCH_JAMS_REJECTED,
    payload: error
  };
};

export const fetchJamsCachedSuccess = (jams, authUserId = "") => {
  return {
    type: types.FETCH_JAMS_CACHED_FULFILLED,
    payload: jams,
    authUserId
  };
};

const jamsAreCached = jams => {
  // Jams are not cached if

  // 1. Jams have not been updated after initialization
  // 2. Last update happened after last cache
  // 3. Last cache was set 5min in the past
  console.log(jams);

  // Have jams been updated after initialization?
  if (jams.jams[0]._id === "") {
    return false;
  }

  // Did last update happen after the last cached time?
  if (jams.updatedAt > jams.cachedAt) {
    return false;
  }

  // Has it been 5 min since the last cache?
  const currTime = new Date().getTime();
  const timeDiff = currTime - jams.cachedAt;
  const fiveMin = 1000 * 60 * 5;
  if (timeDiff > fiveMin) {
    return false;
  }

  // Otherwise, if jams are not empty, and the last update was
  // before the last cache time, and the last cache was
  // less than 5min ago, jams are cached
  return true;
};

export const handleFetchJams = () => {
  return async (dispatch, getState) => {
    dispatch(fetchJams());

    // Check if user is authenticated, if so, authUserId exists
    const { isAuthenticated } = getState().auth;
    let authUserId = "";
    if (isAuthenticated) {
      authUserId = getState().auth.user.id;
    }
    // Check if jams are cached
    const jams = getState().jams.jams;
    if (jamsAreCached(jams)) {
      console.log("jams are cached");
      // use cached data already in state
      dispatch(fetchJamsCachedSuccess(jams.jams, authUserId));
    } else {
      // Make async call
      try {
        const serverUrl = `${serverUri}/jams`;
        console.log(`GET to ${serverUrl}`);
        const res = await axios.get(serverUrl);
        console.log(res);
        dispatch(fetchJamsSuccess(res.data, authUserId));
      } catch (err) {
        console.log("Error requesting GET to server.", err);
        dispatch(fetchJamsError(err.message));
      }
    }
  };
};

export const fetchJamsByUserCache = () => {
  return {
    type: types.FETCH_JAMS_BY_USER_CACHE
  };
};

export const fetchJamsByUserCacheSuccess = (jams, userId = "") => {
  return {
    type: types.FETCH_JAMS_BY_USER_CACHE_FULFILLED,
    payload: jams,
    userId
  };
};

export const fetchJamsByUserCacheError = error => {
  return {
    type: types.FETCH_JAMS_BY_USER_CACHE_REJECTED,
    payload: error
  };
};

export const handleFetchByUserIdCache = (userId, cache, authUser = "") => {
  return async dispatch => {
    dispatch(fetchJamsByUserCache());
    try {
      let jams;
      console.log(cache[userId]);
      if (userId in cache) {
        jams = cache[userId];
      } else {
        jams = [];
      }
      dispatch(fetchJamsByUserCacheSuccess(jams, authUser));
    } catch (err) {
      console.log(err);
      dispatch(fetchJamsByUserCacheError(err));
    }
  };
};

export const handleFetchJamsByUserId = (userId, authUser = "") => {
  return async dispatch => {
    dispatch(fetchJams());
    // Make GET request to jam by user id
    try {
      const serverUrl = `${serverUri}/jams/user/${userId}`;
      const res = await axios.get(serverUrl);
      console.log(res);
      dispatch(fetchJamsByUserIdSuccess(res.data, authUser));
    } catch (err) {
      console.log("Error requesting GET to server.", err);
      dispatch(fetchJamsError(err.message));
    }
  };
};

export const fetchJamsByUserId = () => {
  return {
    type: types.FETCH_JAMS_BY_USER_ID
  };
};

export const fetchJamsByUserIdSuccess = (jams, userId = "") => {
  return {
    type: types.FETCH_JAMS_BY_USER_ID_FULFILLED,
    payload: jams,
    userId
  };
};

export const fetchJamsByUserIdError = error => {
  return {
    type: types.FETCH_JAMS_BY_USER_ID_REJECTED,
    payload: error
  };
};

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

// Fetch a single Jam by Jam Id
export const createJam = () => {
  return {
    type: types.CREATE_JAM
  };
};

export const createJamSuccess = jam => {
  return {
    type: types.CREATE_JAM_FULFILLED,
    payload: jam
  };
};

export const createJamError = error => {
  return {
    type: types.CREATE_JAM_REJECTED,
    payload: error
  };
};

export const handleCreateJam = (
  title,
  description,
  location,
  dateOfJam,
  genres,
  avatar
) => {
  return async dispatch => {
    dispatch(createJam());
    // Make POST to create jam
    try {
      const serverUrl = `${serverUri}/jams`;
      const res = await axios.post(serverUrl, {
        location,
        genres,
        description,
        title,
        dateOfJam,
        userAvatar: avatar
      });
      console.log(res);
      dispatch(createJamSuccess(res.data));
    } catch (err) {
      console.log("Error creating jam to server.", err);
      dispatch(createJamError(err.response));
    }
  };
};

export const resetCreateJamForm = () => dispatch => {
  dispatch({ type: types.RESET_CREATE_JAM_FORM });
};
