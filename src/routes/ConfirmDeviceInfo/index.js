import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "confirmdeviceInfo",
  // component: Test,
  getComponent(nextState, cb) {
    require.ensure(
      [],
      (require) => {
        const ConfirmDeviceInfoContainer = require("./containers/ConfirmDeviceInfoContainer.js").default;
        const reducer = require("./modules/confirmdeviceInfo.js").default;
        injectReducer(store, {
          key: "confirmdeviceInfo",
          reducer,
        });
        cb(null, ConfirmDeviceInfoContainer);
      },
      "confirmdeviceInfo",
    );
  },
});
