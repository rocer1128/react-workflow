// import Oscilloscope from "./components/Oscilloscope";

// export default {
//   path: "oscilloscope",
//   component: Oscilloscope,
// };
import Repair from "./components/Repair";
import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "repair",
  // component: Test,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const RepairContainer = require("./containers/RepairContainer.js").default;
      const reducer = require("./modules/repair.js").default;
      injectReducer(store, {
        key: "repair",
        reducer,
      });
      cb(null, RepairContainer);
    }, "repair");
  },
});