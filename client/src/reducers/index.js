import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import fetchReducer from './fetch_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  fetch: fetchReducer
});

export default rootReducer;
