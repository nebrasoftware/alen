import { extraConstants } from '../_constants';
 
export function extras(state = {}, action) {
  switch (action.type) {
    case extraConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case extraConstants.GETALL_SUCCESS:
      return {
        items: action.extras
      };
    case extraConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}