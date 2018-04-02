import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "widget",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Widget = require("./containers/WidgetContainer").default;
      const reducer = require("./modules/widget").default;
      injectReducer(store, {
        key: "widget",
        reducer,
      });
      cb(null, Widget);
    }, "widget");
  },
});
