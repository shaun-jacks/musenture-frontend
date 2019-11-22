import axios from "axios";
import { serverUri } from "../../utils/config";
import setAuthToken from "../../utils/auth";
import jwt_decode from "jwt-decode";

const authLoginMiddleware = ({ dispatch }) => next => async action => {
  next(action);

  if (action.type !== "API_LOGIN") {
    return;
  }

  const {
    onSuccess,
    onFailure,
    onApiStart,
    method = "POST",
    data
  } = action.payload;
  let { url } = action.payload;
  url = `${serverUri}${url}`;

  dispatch(onApiStart());
  try {
    const { data: token } = await axios.request({ url, method, data });
    try {
      const user = jwt_decode(token);
      // Set auth token in header for all new post requests
      setAuthToken(token);
      console.log(user);
      dispatch(onSuccess({ ...user, accessToken: token }));
    } catch (err) {
      dispatch(onFailure(err));
    }
  } catch (err) {
    dispatch(onFailure(err));
  }

  //
};

export default authLoginMiddleware;
