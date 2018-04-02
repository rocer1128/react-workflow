import { applyMiddleware, compose, createStore } from "redux";
import { browserHistory } from "react-router";
import restMiddleware from "./clientMiddleware";
import odooMiddleware from "./odooMiddleware";
import odoowfMiddleware from "./odoowfMiddleware";
import wechatMiddleware from "./wechatMiddleware";
import mqMiddleware from "./mqMiddleware";
import makeRootReducer from "./reducers";
import RestClient from "./restClient";
import OdooClient from "./odooClient";
import OdoowfClient from "./odoowfClient";
import wechatClient from "./wechatClient";
import { updateLocation } from "./location";

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const rest = new RestClient();
  const odoo = new OdooClient();
  const odoowf = new OdoowfClient();
  const wechat = new wechatClient();
  const middleware = [restMiddleware(rest), odooMiddleware(odoo), mqMiddleware(), odoowfMiddleware(odoowf), wechatMiddleware(wechat)];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];

  let composeEnhancers = compose;

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === "function") {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  );
  store.asyncReducers = {};

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const reducers = require("./reducers").default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};
