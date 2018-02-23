// @flow
import { createStore } from 'redux'
import { persistStore } from 'redux-persist'
import allModels from 'models/allModels'
import immutableTransform from 'redux-persist-transform-immutable'

/// #if !isElectron
import path from 'path'
import os from 'os'
import { AsyncNodeStorage } from 'redux-persist-node-storage'
/// #endif

let loginStore = null
let fullStore = null
let currentPrefix = null
const fullStoreChangeCallbacks = []

function createLoginStore() {
  const enhancerCreator = (process.env.NODE_ENV === 'production')
    ? require('./configureEnhancer.production')
    : require('./configureEnhancer.development')

  const enhancer = enhancerCreator('Login store')
  const reducer = require('reducers/combined/commonReducer')

  const store = createStore(reducer, undefined, enhancer)

  const onComplete = new Promise((resolve) => {
    persistStore(store, {
      blacklist: ['ui', 'form', 'globalError'],
      transforms: [immutableTransform({records: allModels})],
/// #if !isElectron
      storage: new AsyncNodeStorage(path.join(os.homedir(), '.arbore-contactAdder')),
/// #endif
    }, () => { resolve(store) })
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('reducers/combined/commonReducer', () => (
      store.replaceReducer(require('reducers/combined/commonReducer'))
    ))
  }

  return { store, onComplete }
}

function createFullStore(prefix: string, name: string) {
  const enhancerCreator = (process.env.NODE_ENV === 'production')
    ? require('./configureEnhancer.production')
    : require('./configureEnhancer.development')

  const enhancer = enhancerCreator('Full store: ' + name)
  const reducer = require('reducers/combined/fullReducer')

  const store = createStore(reducer, undefined, enhancer)

  const onComplete = new Promise((resolve) => {
    persistStore(store, {
      blacklist: ['form', 'globalError'],
      transforms: [immutableTransform({records: allModels})],
      keyPrefix: '@'+prefix+':',
/// #if !isElectron
      storage: new AsyncNodeStorage(path.join(os.homedir(), '.arbore-contactAdder')),
/// #endif
    }, () => { resolve(store) })
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('reducers/combined/fullReducer', () => (
      store.replaceReducer(require('reducers/combined/fullReducer'))
    ))
  }

  return { store, onComplete }
}

/**
 * Register a callback that will be triggered when the full store change for another profile
 * @param callback
 */
export function addfullStoreChangeCallback(callback: (any) => any) {
  fullStoreChangeCallbacks.push(callback)
}

/**
 * Get the login store
 */
export function getLoginStore() {
  if(!loginStore) {
    const { store, onComplete } = createLoginStore()
    loginStore = store

    return onComplete
  }

  return Promise.resolve(loginStore)
}

/**
 * Get the asked full store. If the current full store is different, it will be unloaded and replaced by the one asked.
 * @param prefix storage identifier
 * @param name debugging helper name
 */
export function getFullStore(prefix, name) {
  if(prefix !== currentPrefix) {
    const { store, onComplete } = createFullStore(prefix, name)
    fullStore = store
    currentPrefix = prefix

    fullStoreChangeCallbacks.forEach(callback => callback(onComplete))

    return onComplete
  }
  return Promise.resolve(fullStore)
}

/**
 * Force unloading the current full store
 */
export function dropFullStore() {
  fullStore = null
  currentPrefix = null
}
