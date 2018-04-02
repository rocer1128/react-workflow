import DeviceInfo from "./components/DeviceInfo";
import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "deviceinfo",
  // component: Test,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const DeviceInfoContainer = require("./containers/DeviceInfoContainer.js").default;
      const reducer = require("./modules/deviceinfo.js").default;
      injectReducer(store, {
        key: "deviceinfo",
        reducer,
      });
      cb(null, DeviceInfoContainer);
    }, "deviceinfo");
  },
});
