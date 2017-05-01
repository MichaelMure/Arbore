// @flow
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import identityList from '../identityList'

const commonReducer = combineReducers({
  identityList,
  form: formReducer
});

export default commonReducer;
