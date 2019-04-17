import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { extras } from './extras.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { wear } from './wear.reducer';
import { body } from './body.reducer';
import { populations } from './populations.reducer';
import { drivingLicenses } from './drivingLicenses.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  extras,
  users,
  alert,
  wear,
  body,
  populations,
  drivingLicenses
});

export default rootReducer;