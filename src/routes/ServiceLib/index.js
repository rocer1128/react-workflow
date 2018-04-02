import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "servicelib",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ServiceLibContainer = require("./containers/ServiceLibContainer").default;
      const reducer = require("./modules/servicelib").default;
      injectReducer(store, {
        key: "servicelib",
        reducer,
      });
      cb(null, ServiceLibContainer);
    }, "servicelib");
  },
});
