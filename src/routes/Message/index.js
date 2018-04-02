import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "message",
  // component: Test,
  getComponent(nextState, cb) {
    require.ensure(
      [],
      (require) => {
        const MessageContainer = require("./containers/MessageContainer.js").default;
        const reducer = require("./modules/message.js").default;
        injectReducer(store, {
          key: "message",
          reducer,
        });
        cb(null, MessageContainer);
      },
      "message",
    );
  },
});
