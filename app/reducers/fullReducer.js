// @flow
import { combineReducers } from 'redux';
import identityList from './identityList'
import contactList from './contactList'
import profile from './profile'
import shareList from './shareList'
import ui from './ui'

const fullReducer = combineReducers({
  identityList,
  contactList,
  profile,
  shareList,
  ui
});

export default fullReducer;
