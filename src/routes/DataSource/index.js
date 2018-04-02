import { injectReducer } from "../../store/reducers"

export default (store) => ({
  path: "dataSource",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const DataSource = require("./containers/DataSourceContainer").default
      // const reducer = require("./modules/dataSource").default
      // injectReducer(store, {
      //   key: "dataSource",
      //   reducer
      // })
      const { sourceReducer } = require("./modules/dataSource")
      const { pointReducer } = require("./modules/dataSource")

      injectReducer(store, {
        key: "dataSource",
        reducer: sourceReducer
      })
      injectReducer(store, {
        key: "dataPoint",
        reducer: pointReducer
      })
      cb(null, DataSource)
    }, "dataSource")
  }
})
