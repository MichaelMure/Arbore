// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import profile from './profile'
import ui from './ui'

const rootReducer = combineReducers({
  counter,
  profile,
  ui,
  routing
});

export default rootReducer;
