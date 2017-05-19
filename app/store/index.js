// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist'
import allModels from 'models/allModels'
import immutableTransform from 'redux-persist-transform-immutable'


export function getLoginStore() {
  const enhancerCreator = (process.env.NODE_ENV === 'production')
    ? require('./configureEnhancer.production')
    : require('./configureEnhancer.development')

  const enhancer = enhancerCreator('Login store')
  const reducer = require('reducers/combined/commonReducer')

  const store = createStore(reducer, undefined, enhancer)

  const onComplete = new Promise((resolve) => {
    persistStore(store, {
      blacklist: ['ui', 'form'],
      transforms: [immutableTransform({records: allModels})]
    }, () => { resolve(store) })
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('reducers/combined/commonReducer', () => (
      store.replaceReducer(require('reducers/combined/commonReducer'))
    ))
  }

  return { store, onComplete }
}

export function getFullStore(prefix: string, name: string) {
  const enhancerCreator = (process.env.NODE_ENV === 'production')
    ? require('./configureEnhancer.production')
    : require('./configureEnhancer.development')

  const enhancer = enhancerCreator('Full store: ' + name)
  const reducer = require('reducers/combined/fullReducer')

  const store = createStore(reducer, undefined, enhancer)

  const onComplete = new Promise((resolve) => {
    persistStore(store, {
      blacklist: ['ui', 'form'],
      transforms: [immutableTransform({records: allModels})],
      keyPrefix: '@'+prefix+':'
    }, () => { resolve(store) })
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('reducers/combined/fullReducer', () => (
      store.replaceReducer(require('reducers/combined/fullReducer'))
    ))
  }

  return { store, onComplete }
}
