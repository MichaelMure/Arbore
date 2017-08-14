// @flow
import { applyMiddleware, compose } from 'redux'
import { autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'
import createActionBuffer from 'redux-action-buffer'
import {REHYDRATE} from 'redux-persist/constants'
import shareListenerMiddleware from './shareListenerMiddleware'

export default function configureEnhancer(storeName) {
  // TODO: the shareListenerMiddleware is applied for the loginstore as well, that is useless

  return compose(
    applyMiddleware(thunk, createActionBuffer(REHYDRATE), shareListenerMiddleware),
    autoRehydrate()
  )
}
