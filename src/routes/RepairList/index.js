import RepairList from "./components/RepairList";
import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "repairlist",
  // component: Test,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const RepairListContainer = require("./containers/RepairListContainer.js").default;
      const reducer = require("./modules/repairlist.js").default;
      injectReducer(store, {
        key: "repairlist",
        reducer,
      });
      cb(null, RepairListContainer);
    }, "repairlist");
  },
});
