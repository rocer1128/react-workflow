import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "resource",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Resource = require("./containers/ResourceContainer").default;
      const reducer = require("./modules/resource").default;
      injectReducer(store, {
        key: "resource",
        reducer,
      });
      cb(null, Resource);
    }, "resource");
  },
});
