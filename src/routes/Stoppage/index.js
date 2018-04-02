import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "stoppage",
  // component: Test,
  getComponent(nextState, cb) {
    require.ensure(
      [],
      (require) => {
        const StoppageContainer = require("./containers/StoppageContainer.js").default;
        const reducer = require("./modules/stoppage.js").default;
        injectReducer(store, {
          key: "stoppage",
          reducer,
        });
        cb(null, StoppageContainer);
      },
      "stoppage",
    );
  },
});
