import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createStoreByPage from "./store/createStoreByPage";
import CoreLayoutNoHeader from "./layouts/CoreLayout/CoreLayoutNoHeader";
// ========================================================
// 需要用到的Page页面的Container和Reducer在下面引用,后期可考虑通过配置
// 有可能需要权限,权限也需要加入到PageReducer中,并建立初始状态
// ========================================================
import Container from "./routes/Repair/containers/RepairContainer";
import Reducer from "./routes/Repair/modules/repair";
import authReducer from "./routes/Home/modules/auth";

const initialState = window.___INITIAL_STATE__;

// ========================================================
// 配置store加入用户权限和Page的Reducer
// ========================================================
const authState = {
  ...initialState,
  home: {
    user: {
      id: 1,
      permission: 0,
    },
  },
};

const store = createStoreByPage(authState, {
  repair: Reducer,
  home: authReducer,
});

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById("root");

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <div style={{ height: "100%" }}>
        <CoreLayoutNoHeader>
          <Container />
        </CoreLayoutNoHeader>
      </div>
    </Provider>,
    MOUNT_NODE);
};

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require("redbox-react").default;
      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        console.error(error);
        renderError(error);
      }
    };

    // Setup hot module replacement
    // module.hot.accept("./routes/index", () => setImmediate(() => {
    //   ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    //   render();
    // })
    // );
  }
}

// ========================================================
// Go!
// ========================================================
render();
