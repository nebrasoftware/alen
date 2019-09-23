import { extraConstants } from '../_constants';
 
export function addExtra(state = {}, action) {
  switch (action.type) {
    case extraConstants.GET_NEW_ID_REQUEST:
      return {
        loading: true
      };
    case extraConstants.GET_NEW_ID_SUCCESS:
      return {
        id: action.id
      };
    case extraConstants.GET_NEW_ID_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}