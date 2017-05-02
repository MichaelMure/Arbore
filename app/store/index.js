// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist'
import allModels from 'models/allModels'
import immutableTransform from 'redux-persist-transform-immutable'

let currentReducer = 'common'
let store = null
let persistor = null

export function getStore() {
  if(store !== null) {
    return store
  }

  const enhancerCreator = (process.env.NODE_ENV === 'production')
    ? require('./configureEnhancer.production')
    : require('./configureEnhancer.development')

  const enhancer = enhancerCreator()

  const reducer = currentReducer === 'common'
    ? require('reducers/combined/commonReducer')
    : require('reducers/combined/fullReducer')

  store = createStore(reducer, undefined, enhancer)

  const config = {
    blacklist: ['ui', 'form'],
    transforms: [immutableTransform({records: allModels})],
    commonKeys: ['identityList'],
  }

  persistor = persistStore(store, config)

  if (process.env.NODE_ENV === 'production' && module.hot) {
    if (currentReducer === 'common') {
      module.hot.accept('reducers/commonReducer', () =>
        store.replaceReducer(require('reducers/combined/commonReducer'))
      )
    } else {
      module.hot.accept('reducers/fullReducer', () =>
        store.replaceReducer()
      )
    }
  }

  return store
}

export function changeStorePrefix(prefix: string) : Promise<void> {
  if(store === null) {
    getStore()
  }

  return persistor.changeDynPrefix(prefix)
    .then(() => {
      if(currentReducer === 'common') {
        store.replaceReducer(require('reducers/combined/fullReducer'))
        currentReducer = 'full'
      }
    })
}

export function resetStorePrefix() : Promise<void> {
  if(store === null) {
    getStore()
  }

  return persistor.changeDynPrefix()
    .then(() => {
      if (currentReducer !== 'common') {
        store.replaceReducer(require('reducers/combined/commonReducer'))
        currentReducer = 'common'
      }
    })
}
