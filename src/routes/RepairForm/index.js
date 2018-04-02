import RepairForm from "./components/RepairForm";
import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "repairform",
  // component: Test,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const RepairFormContainer = require("./containers/RepairFormContainer.js").default;
      const reducer = require("./modules/repairform.js").default;
      injectReducer(store, {
        key: "repairform",
        reducer,
      });
      cb(null, RepairFormContainer);
    }, "repairform");
  },
});
