// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import { asyncLocalStorage } from 'redux-persist/storages'
import immutableTransform from 'redux-persist-transform-immutable'
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import allModels from 'models/allModels'

const enhancer = compose(
  applyMiddleware(thunk),
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

  return store
}
