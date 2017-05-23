// @flow
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import chatRoomList from '../chatRoomList'
import contactList from '../contactList'
import contactPool from '../contactPool'
import profile from '../profile'
import shareList from '../shareList'
import ui from '../ui'

const fullReducer = combineReducers({
  chatRoomList,
  contactList,
  contactPool,
  profile,
  shareList,
  ui,
  form: formReducer
});

export default fullReducer;
