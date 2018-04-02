import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "gis",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const GisContainer = require("./containers/GisContainer.js").default;
      const reducer = require("./modules/gis.js").default;
      injectReducer(store, {
        key: "gis",
        reducer,
      });
      cb(null, GisContainer);
    }, "gis");
  },
});
