// @flow
import * as error from 'actions/globalError';
import { handleActions } from 'redux-actions'
import type { Action } from 'utils/types'
import GlobalError from 'models/GlobalError'

const initialState = null

export default handleActions({
  [error.setError]: (state, action: Action<string>) => (
    new GlobalError(action.payload)
  ),

  [error.resetError]: (state, action: Action) => (
    null
  ),
}, initialState )
