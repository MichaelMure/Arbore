import { applyMiddleware, compose } from 'redux'
import { autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import allActions from 'actions/allActions'

export default function configureEnhancer() {
  const actionCreators = {
    ...allActions
  }

  const logger = createLogger({
    level: 'info',
    collapsed: true
  })


  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://extension.remotedev.io/docs/API/Arguments.html
      actionCreators,
    }) :
    compose;

  return composeEnhancers(
    applyMiddleware(thunk, logger),
    autoRehydrate()
  )
}
