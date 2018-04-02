import ModuleList from "./components/ModuleList";
import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "modulelist",
  // component: Test,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ModuleListContainer = require("./containers/ModuleListContainer.js").default;
      const reducer = require("./modules/modulelist.js").default;
      injectReducer(store, {
        key: "modulelist",
        reducer,
      });
      cb(null, ModuleListContainer);
    }, "modulelist");
  },
});
