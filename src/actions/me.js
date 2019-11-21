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

export const fetchMeCacheSuccess = () => {
  return {
    type: types.FETCH_ME_CACHED_FULFILLED
  };
};

export const fetchMeError = error => {
  return {
    type: types.FETCH_ME_REJECTED,
    payload: error
  };
};

const isMeCached = me => {
  console.log(me);
  // Not cached if
  // 1. There is no me.user information
  if (!me.user.id) {
    return false;
  }
  // 2. updatedAt is after cachedAt
  if (me.updatedAt > me.cachedAt) {
    return false;
  }
  // 3. It has been 5min since last cache
  const currTime = new Date().getTime();
  const fiveMin = 1000 * 60 * 5;
  const timeSinceCache = currTime - me.cachedAt;
  if (timeSinceCache > fiveMin) {
    return false;
  }

  return true;
};

export const handleFetchMe = () => {
  return async (dispatch, getState) => {
    dispatch(fetchMe());
    // first check if is authenticated
    const { isAuthenticated } = getState().auth;
    let authUserId = "";
    if (isAuthenticated) {
      authUserId = getState().auth.user.id;
    }
    if (!isAuthenticated) {
      dispatch(fetchMeError("Must login to view profile."));
    }
    const me = getState().me.me;
    if (isMeCached(me)) {
      dispatch(fetchMeCacheSuccess());
    } else {
      try {
        const res = await axios.get(`${serverUri}/users/me`);
        console.log(res);
        dispatch(fetchMeSuccess(res.data));
      } catch (err) {
        console.log("Error requesting GET to server.", err);
        dispatch(fetchMeError(err));
      }
    }
    dispatch(handleFetchMeJams(authUserId));
  };
};

export const fetchMeJams = () => {
  return {
    type: types.FETCH_ME_JAMS
  };
};

export const fetchMeJamsSuccess = (jam, authUserId) => {
  return {
    type: types.FETCH_ME_JAMS_FULFILLED,
    payload: jam,
    authUserId
  };
};

export const fetchMeJamsError = error => {
  return {
    type: types.FETCH_ME_JAMS_REJECTED,
    payload: error
  };
};

export const fetchMeJamsCacheSuccess = () => {
  return {
    type: types.FETCH_ME_JAMS_CACHED_FULFILLED
  };
};

const isMeJamsCached = jams => {
  // Not cached if
  // 1. There is no me.jams.jams information
  console.log(jams);
  if (!jams.jams[0].user.userId) {
    console.log("HERE");
    return false;
  }
  // 2. updatedAt is after cachedAt
  if (jams.updatedAt > jams.cachedAt) {
    return false;
  }
  // 3. It has been 5min since last cache
  const currTime = new Date().getTime();
  const fiveMin = 1000 * 60 * 5;
  const timeSinceCache = currTime - jams.cachedAt;
  if (timeSinceCache > fiveMin) {
    return false;
  }

  return true;
};

export const handleFetchMeJams = () => {
  return async (dispatch, getState) => {
    dispatch(fetchMeJams());
    // first check if user is authenticated
    const { isAuthenticated } = getState().auth;
    let authUserId = "";
    if (isAuthenticated) {
      authUserId = getState().auth.user.id;
    }
    if (!isAuthenticated) {
      dispatch(fetchMeJamsError("Must login to view profile."));
    }
    const jams = getState().me.me.jams;
    console.log(jams);
    // Make GET request to jam by id
    if (isMeJamsCached(jams)) {
      dispatch(fetchMeJamsCacheSuccess());
    } else {
      try {
        const serverUrl = `${serverUri}/jams/user/${authUserId}`;
        const res = await axios.get(serverUrl);
        console.log(res);
        dispatch(fetchMeJamsSuccess(res.data, authUserId));
      } catch (err) {
        console.log("Error requesting GET to server.", err);
        dispatch(fetchMeJamsError(err.message));
      }
    }
  };
};

export const showMeModal = () => {
  return {
    type: types.SHOW_ME_MODAL
  };
};

export const closeMeModal = () => {
  return {
    type: types.CLOSE_ME_MODAL
  };
};

export const showEditMeModal = () => {
  return {
    type: types.SHOW_EDIT_ME_MODAL
  };
};

export const closeEditMeModal = () => {
  return {
    type: types.CLOSE_EDIT_ME_MODAL
  };
};

export const editProfile = () => {
  return {
    type: types.EDIT_PROFILE
  };
};

export const editProfileSuccess = (displayName, bio, instrument) => {
  return {
    type: types.EDIT_PROFILE_FULFILLED,
    displayName,
    bio,
    instrument
  };
};

export const editProfileError = error => {
  return {
    type: types.EDIT_PROFILE_REJECTED,
    payload: error
  };
};

export const handleEditProfile = (displayName, bio, instrument) => {
  return async dispatch => {
    dispatch(editProfile());
    // Make GET request to jam by id
    try {
      const serverUrl = `${serverUri}/users`;
      const res = await axios.put(serverUrl, { displayName, bio, instrument });
      console.log(res);
      dispatch(editProfileSuccess(displayName, bio, instrument));
    } catch (err) {
      console.log("Error editing profile to server.", err.response);
      dispatch(editProfileError(err.message));
    }
  };
};

export const resetEditProfileForm = () => dispatch => {
  dispatch({ type: types.RESET_EDIT_PROFILE_FORM });
};
