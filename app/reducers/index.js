// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import profile from './profile'
import shareList from './shareList'
import ui from './ui'

const rootReducer = combineReducers({
  profile,
  shareList,
  ui,
  routing
});

export default rootReducer;
