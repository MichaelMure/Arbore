// @flow
import { combineReducers } from 'redux';
import contactList from './contactList'
import profile from './profile'
import shareList from './shareList'
import ui from './ui'

const rootReducer = combineReducers({
  contactList,
  profile,
  shareList,
  ui
});

export default rootReducer;
