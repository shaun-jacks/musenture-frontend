import { push } from "connected-react-router";
import { asyncActions } from "../modules/db/users";

const loginFlowMiddleware = ({ dispatch }) => next => async action => {
  next(action);

  if (action.type !== "AUTH/LOGIN_SUCCESS") {
    return;
  }
  await dispatch(asyncActions.fetchUsers());
  console.log("waited");
  // dispatch(push("/me"));
};

export default loginFlowMiddleware;
