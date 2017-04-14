// @flow
import { combineReducers } from 'redux';
import profile from './profile'
import shareList from './shareList'
import ui from './ui'

const rootReducer = combineReducers({
  profile,
  shareList,
  ui
});

export default rootReducer;
