// @flow
import * as actions from '../actions/share';
import Share, { writable } from '../models/Share'
import type { IpfsObject } from '../models/IpfsObject'
import { handleActions } from 'redux-actions'
import { Action } from '../utils/types'

const initialState = null

export default handleActions({

  [actions.addObject]: (state: Share, action: Action<IpfsObject>) => {
    console.assert(
      state.content.every(
        (child: IpfsObject) => !(child.hash.equals(action.payload.hash))
      )
    )
    return state.set(writable.content, state.content.push(action.payload))
  },

  [actions.toggleFavorite]: (state: Share, action: Action) => (
    state.update(writable.favorite, ! state.favorite)
  )

}, initialState )
