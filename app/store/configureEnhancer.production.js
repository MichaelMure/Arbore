// @flow
import { applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk';
import createActionBuffer from 'redux-action-buffer'
import {REHYDRATE} from 'redux-persist/constants'

export default function configureEnhancer(storeName) {
  return compose(
    applyMiddleware(thunk, createActionBuffer(REHYDRATE)),
    autoRehydrate()
  )
}
