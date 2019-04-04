import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { extras } from './extras.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { wear } from './wear.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  extras,
  users,
  alert,
  wear
});

export default rootReducer;