import axios from "axios";
import { serverUri } from "../../config";

export default apiMiddleware = ({ dispatch }) => next => action => {
  next(action);
  if (action.type !== "API") {
    return;
  }

  const {
    onSuccess,
    onFailure,
    onApiStart,
    method = "GET",
    data
  } = action.payload;
  let { url } = action.payload;
  url = `${serverUri}${url}`;

  dispatch(onApiStart());
  axios
    .request({ url, method, data })
    .then(({ data }) => {
      console.log(data);
      dispatch(onSuccess(data));
    })
    .catch(error => {
      console.log(error);
      dispatch(onFailure(error));
    });

  //
};
