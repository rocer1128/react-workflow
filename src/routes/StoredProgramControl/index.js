import StoredProgramControl from "./components/StoredProgramControl";
import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "storedprogramcontrol",
  // component: Test,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const StoredProgramControlContainer = require("./containers/StoredProgramControlContainer.js").default;
      const reducer = require("./modules/storedprogramcontrol.js").default;
      injectReducer(store, {
        key: "storedprogramcontrol",
        reducer,
      });
      const runtimerReducer = require("../RuntimerPage/modules/runtimer").default;
      injectReducer(store, {
        key: "test",
        reducer: runtimerReducer,
      });
      cb(null, StoredProgramControlContainer);
    }, "storedprogramcontrol");
  },
});
