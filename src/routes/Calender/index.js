// import Oscilloscope from "./components/Oscilloscope";

// export default {
//   path: "oscilloscope",
//   component: Oscilloscope,
// };
import Calender from "./components/Calender";
import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "calender",
  // component: Test,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const CalenderContainer = require("./containers/CalenderContainer.js").default;
      const reducer = require("./modules/calender.js").default;
      injectReducer(store, {
        key: "calender",
        reducer,
      });
      cb(null, CalenderContainer);
    }, "calender");
  },
});