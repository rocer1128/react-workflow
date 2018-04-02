// import Oscilloscope from "./components/Oscilloscope";

// export default {
//   path: "oscilloscope",
//   component: Oscilloscope,
// };
import Oscilloscope from "./components/Oscilloscope";
import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "oscilloscope",
  // component: Test,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ShowTestContainer = require("./containers/ShowTestContainer.js").default;
      const reducer = require("./modules/oscilloscope.js").default;
      injectReducer(store, {
        key: "oscilloscope",
        reducer,
      });
      cb(null, ShowTestContainer);
    }, "oscilloscope");
  },
});