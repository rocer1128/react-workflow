// import Test from "./components/Test";

// export default {
//   path: "equipmentTest",
//   component: Test,
// };

import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "equipmentTest",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const equipmentTest = require("./containers/equipmentTest.js").default;
      const reducer = require("./modules/equipmentTest.js").default;
      injectReducer(store, {
        key: "equipmentTest",
        reducer,
      });
      cb(null, equipmentTest);
    }, "equipmentTest");
  },
});
