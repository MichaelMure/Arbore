// @flow
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import chatRoomList from '../chatRoomList'
import contactList from '../contactList'
import globalError from '../globalError'
import profile from '../profile'
import settings from '../settings'
import shareList from '../shareList'
import ui from '../ui'

const fullReducer = combineReducers({
  chatRoomList,
  contactList,
  profile,
  settings,
  shareList,
  ui,
  form: formReducer,
  globalError
});

export default fullReducer;
