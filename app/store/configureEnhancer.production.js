// @flow
import { applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk';

export default function configureEnhancer(storeName) {
  return compose(
    applyMiddleware(thunk),
    autoRehydrate()
  )
}
