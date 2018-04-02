import Todo from "./components/Todo";
import { injectReducer } from "../../store/reducers";

export default store => ({
  path: "todo",
  // component: Test,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const TodoContainer = require("./containers/TodoContainer.js").default;
      const reducer = require("./modules/todo.js").default;
      injectReducer(store, {
        key: "todo",
        reducer,
      });
      cb(null, TodoContainer);
    }, "todo");
  },
});