import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "dataLink",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const DataLink = require("./containers/DataLinkContainer").default;
      const reducer = require("./modules/dataLink").default;
      injectReducer(store, {
        key: "dataLink",
        reducer,
      });
      cb(null, DataLink);
    }, "dataLink");
  },
});
