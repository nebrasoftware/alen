import { drivingLicensesConstants } from '../_constants';
 
export function drivingLicenses(state = {}, action) {
  switch (action.type) {
    case drivingLicensesConstants.LICENSES_REQUEST:
      return {
        loading: true
      };
    case drivingLicensesConstants.LICENSES_SUCCESS:
      return {
        types: action.types
      };
    case drivingLicensesConstants.LICENSES_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}