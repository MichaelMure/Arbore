// @flow
import * as ui from '../actions/ui';
import { Map, fromJS } from 'immutable';
import { handleActions } from 'redux-actions'
import { Action } from '../utils/types'

const initialState = fromJS({
  profileOpen: false
})

export default handleActions({

  [ui.openProfile]: (state: Map, action: Action) => (
    state.set('profileOpen', true)
  ),

  [ui.closeProfile]: (state: Map, action: Action) => (
    state.set('profileOpen', false)
  ),

  [ui.toggleProfile]: (state: Map, action: Action) => (
    state.set('profileOpen', ! state.get('profileOpen'))
  ),

}, initialState )
