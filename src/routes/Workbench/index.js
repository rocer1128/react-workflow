import { injectReducer } from "../../store/reducers";

export default (store) => ({
  path: "workbench",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Workbench = require("./containers/WorkbenchContainer").default;
      const reducer = require("./modules/workbench").default;
      injectReducer(store, {
        key: "workbench",
        reducer,
      })
      const gisReducer = require("../Gis/modules/gis").default;
      injectReducer(store, {
        key: "gis",
        reducer: gisReducer,
      });
      // const widgetReducer = require("../Widget/modules/widget").default;
      // injectReducer(store, {
      //   key: "widget",
      //   reducer: widgetReducer,
      // })
      cb(null, Workbench)
    }, "workbench")
  }
})
