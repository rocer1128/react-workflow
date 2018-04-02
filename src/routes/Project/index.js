import {
  injectReducer
} from '../../store/reducers'

export default (store) => ({
  path: 'project',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Project = require('./containers/ProjectContainer').default
      const reducer = require('./modules/project').default
      injectReducer(store, {
        key: 'project',
        reducer
      })
      cb(null, Project)
    }, 'project')
  }
})
