import { applyMiddleware, compose } from 'redux'
import { autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import allActions from 'actions/allActions'
import createActionBuffer from 'redux-action-buffer'
import {REHYDRATE} from 'redux-persist/constants'


export default function configureEnhancer(storeName) {
  const actionCreators = {
    ...allActions
  }

  const logger = createLogger({
    predicate: (getState, action) => ! action.type.startsWith('@@redux-form'),
    level: 'info',
    collapsed: true,
    timestamp: false,
    duration: true,
  })


  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://extension.remotedev.io/docs/API/Arguments.html
      actionsBlacklist: ['@@redux-form'],
      actionCreators,
      name: storeName,
    }) :
    compose;

  return composeEnhancers(
    applyMiddleware(thunk, createActionBuffer(REHYDRATE), logger),
    autoRehydrate({log: true})
  )
}
