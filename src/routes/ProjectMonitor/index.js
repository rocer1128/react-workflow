import { injectReducer } from "../../store/reducers";

export default (store) => ({
  path: "projectMonitor",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectMonitor = require("./containers/ProjectMonitorContainer").default;
      const projectMonitorReducer = require("./modules/projectMonitor").default;
      injectReducer(store, {
        key: "projectMonitor",
        reducer: projectMonitorReducer,
      });
      const runtimerReducer = require("../RuntimerPage/modules/runtimer").default;
      injectReducer(store, {
        key: "test",
        reducer: runtimerReducer,
      });
      const curveReducer = require("./modules/CurveReducer").default;
      injectReducer(store, {
        key: "curve",
        reducer: curveReducer,
      });
      cb(null, ProjectMonitor);
    }, "projectMonitor");
  },
});
