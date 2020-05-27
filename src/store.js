import reducers from "./reducers/index";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { redirectMiddleware } from "./redirectMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

export const store = createStore(
  reducers,
  {},
  composeEnhancers(
    applyMiddleware(...middleware, redirectMiddleware)
    // other store enhancers if any
  )
);
