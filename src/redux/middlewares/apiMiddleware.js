import axios from "axios";
import { serverUri } from "../../utils/config";

const apiMiddleware = ({ dispatch, getState }) => next => action => {
  next(action);
  if (action.type !== "API") {
    return;
  }
  const defaultHeaders = {};
  const { accessToken } = getState().auth;
  if (accessToken) {
    Object.assign(defaultHeaders, { ["x-auth-token"]: `${accessToken}` });
  }

  const {
    method = "GET",
    data,
    endpoint,
    onApiStart,
    onSuccess,
    onFailure,
    transformResponse
  } = action.payload;
  const url = serverUri + endpoint;

  dispatch(onApiStart());
  axios
    .request({
      url,
      method,
      data,
      headers: defaultHeaders,
      // To not overwrite default axios transforming data to json
      transformResponse: axios.defaults.transformResponse.concat(
        transformResponse
      )
    })
    .then(({ data }) => {
      console.log(data);
      dispatch(onSuccess(data));
    })
    .catch(error => {
      console.log(error);
      dispatch(onFailure(error.message));
    });
};

export default apiMiddleware;
