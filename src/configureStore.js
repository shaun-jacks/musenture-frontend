import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";
import thunk from "redux-thunk";
import apiMiddleware from "./redux/middlewares/apiMiddleware";
import loginFlowMiddleware from "./redux/middlewares/loginFlowMiddleware";

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history),
        thunk,
        apiMiddleware,
        loginFlowMiddleware
      )
    )
  );

  return store;
}
