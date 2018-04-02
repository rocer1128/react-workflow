import { injectReducer } from "../../store/reducers";

export default (store) => ({
  path: "realTimePage",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const RealTimePage = require("./containers/RealTimePageContainer").default;
      const RealTimePageReducer = require("./modules/realTimePage").default;
      injectReducer(store, {
        key: "realTimePage",
        reducer: RealTimePageReducer,
      });
      const runtimerReducer = require("../RuntimerPage/modules/runtimer").default;
      injectReducer(store, {
        key: "test",
        reducer: runtimerReducer,
      });
      cb(null, RealTimePage);
    }, "realTimePage");
  },
});
