import RepairDevice from "./components/RepairDevice";
import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "repairdevice",
  // component: Test,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const RepairDeviceContainer = require("./containers/RepairDeviceContainer.js").default;
      const reducer = require("./modules/repairdevice.js").default;
      injectReducer(store, {
        key: "repairdevice",
        reducer,
      });
      cb(null, RepairDeviceContainer);
    }, "repairdevice");
  },
});
