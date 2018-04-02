import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "repairlib",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const GisContainer = require("./containers/repairLibraryContainer.js").default;
      const reducer = require("./modules/repairlibrary.js").default;
      injectReducer(store, {
        key: "repairlib",
        reducer,
      });
      cb(null, GisContainer);
    }, "repairlib");
  },
});
