import MachineRepair from "./components/MachineRepair";
import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "machinerepair",
  // component: Test,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const MachineRepairContainer = require("./containers/MachineRepairContainer.js").default;
      const reducer = require("./modules/machinerepair.js").default;
      injectReducer(store, {
        key: "machinerepair",
        reducer,
      });
      cb(null, MachineRepairContainer);
    }, "machinerepair");
  },
});
