import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { asyncLocalStorage } from 'redux-persist/storages'
import immutableTransform from 'redux-persist-transform-immutable'
import LoginStorage from './loginStorage'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from 'reducers'
import allActions from 'actions/allActions'
import allModels from 'models/allModels'

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
/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
  applyMiddleware(thunk, logger),
  autoRehydrate()
)

export default function configureStore(prefix) {
  const store = createStore(rootReducer, undefined, enhancer);
  const storage = new LoginStorage(
    asyncLocalStorage,
    ['identityList'],
    prefix
  )

  persistStore(store, {
    blacklist: ['ui'],
    transforms: [immutableTransform({records: allModels})],
    storage: storage,
    keyPrefix: ''
  })

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
}
