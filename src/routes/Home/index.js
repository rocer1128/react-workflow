import { injectReducer } from "../../store/reducers"

export default (store) => ({
  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const Home = require("./containers/HomeContainer").default
      const reducer = require("./modules/auth").default

      injectReducer(store, {
        key: "home",
        reducer
      });
      next(null, Home)
    })
  }
})


