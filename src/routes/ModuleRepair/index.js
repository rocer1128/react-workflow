import ModuleRepair from "./components/ModuleRepair";
import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "modulerepair",
  // component: Test,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ModuleRepairContainer = require("./containers/ModuleRepairContainer.js").default;
      const reducer = require("./modules/modulerepair.js").default;
      injectReducer(store, {
        key: "modulerepair",
        reducer,
      });
      cb(null, ModuleRepairContainer);
    }, "modulerepair");
  },
});
