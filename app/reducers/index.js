// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import profile from './profile'
import ui from './ui'

const rootReducer = combineReducers({
  profile,
  ui,
  routing
});

export default rootReducer;
