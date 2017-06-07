// @flow
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import identityList from '../identityList'
import globalError  from '../globalError'

const commonReducer = combineReducers({
  identityList,
  form: formReducer,
  globalError
});

export default commonReducer;
