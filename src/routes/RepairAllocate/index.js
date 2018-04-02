import RepairAllocate from "./components/RepairAllocate";
import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "repairallocate",
  // component: Test,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const RepairAllocateContainer = require("./containers/RepairAllocateContainer.js").default;
      const reducer = require("./modules/repairallocate.js").default;
      injectReducer(store, {
        key: "repairallocate",
        reducer,
      });
      cb(null, RepairAllocateContainer);
    }, "repairallocate");
  },
});
