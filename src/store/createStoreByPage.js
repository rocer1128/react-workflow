import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import restMiddleware from "./clientMiddleware";
import odooMiddleware from "./odooMiddleware";
import mqMiddleware from "./mqMiddleware";
import RestClient from "./restClient";
import OdooClient from "./odooClient";

export default (initialState = {}, pageReducer) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const rest = new RestClient();
  const odoo = new OdooClient();
  const middleware = [restMiddleware(rest), odooMiddleware(odoo), mqMiddleware()];

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
    combineReducers(pageReducer),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  );

  return store;
};
