// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist'
import allModels from 'models/allModels'
import immutableTransform from 'redux-persist-transform-immutable'

let reducerType = 'common'
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

  const reducer = reducerType === 'common'
    ? require('reducers/combined/commonReducer')
    : require('reducers/combined/fullReducer')

  store = createStore(reducer, undefined, enhancer)

  const config = {
    blacklist: ['ui', 'form'],
    transforms: [immutableTransform({records: allModels})],
    commonKeys: ['identityList'],
  }

  persistor = persistStore(store, config)


  // TODO: i don't think it works as expected ...
  // have to look at the doc of module.hot.accept
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    if (reducerType === 'common') {
      module.hot.accept('reducers/combined/commonReducer', () => (
        store.replaceReducer(require('reducers/combined/commonReducer'))
      ))
    } else {
      module.hot.accept('reducers/combined/fullReducer', () => (
        store.replaceReducer(require('reducers/combined/fullReducer'))
      ))
    }
  }

  return store
}

export async function changeStorePrefix(prefix: string) : Promise<void> {
  if(store === null) {
    getStore()
  }

  if(reducerType === 'common') {
    reducerType = 'full'
    await persistor.changeDynPrefix(prefix, require('reducers/combined/fullReducer'))
  } else {
    await persistor.changeDynPrefix(prefix)
  }
}

export async function resetStorePrefix() : Promise<void> {
  if(store === null) {
    getStore()
  }

  if(reducerType !== 'common') {
    reducerType = 'common'
    await persistor.changeDynPrefix(undefined, require('reducers/combined/commonReducer'))
  } else {
    await persistor.changeDynPrefix(undefined)
  }
}
