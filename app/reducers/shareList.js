// @flow
import * as actions from '../actions/shareList';
import ShareList, { writable } from '../models/ShareList'
import Share from '../models/Share'
import { handleActions } from 'redux-actions'
import { Action } from '../utils/types'

let initialState = new ShareList()

// TODO: remove !
import shareFxt from '../models/fixtures/share'
shareFxt.forEach((share) => {
  initialState = initialState.set(writable.list, initialState.list.push(share))
})


export default handleActions({

  [actions.add]: (state: ShareList, action: Action<Share>) => {
    return state.set(writable.list, state.list.push(action.payload))
  },

}, initialState )
