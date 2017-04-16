// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import allModels from '../models/allModels'

const enhancer = compose(
  applyMiddleware(thunk),
  autoRehydrate()
)

export default function configureStore(initialState) {
  const store = createStore(rootReducer, undefined, enhancer);

  // begin periodically persisting the store
  persistStore(store, {
    blacklist: ['ui'],
    transforms: [immutableTransform({records: allModels})]
  })

  return store
}
