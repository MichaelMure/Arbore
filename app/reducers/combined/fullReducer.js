// @flow
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import identityList from '../identityList'
import chatRoomList from '../chatRoomList'
import contactList from '../contactList'
import profile from '../profile'
import shareList from '../shareList'
import ui from '../ui'

const fullReducer = combineReducers({
  identityList,
  chatRoomList,
  contactList,
  profile,
  shareList,
  ui,
  form: formReducer
});

export default fullReducer;
