import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "test",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Test = require("./containers/Test").default;
      const reducer = require("./modules/runtimer").default;
      injectReducer(store, {
        key: "test",
        reducer,
      });
      cb(null, Test);
    }, "test");
  },
});
