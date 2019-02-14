import { extraConstants } from '../_constants';
 
export function addingExtra(state = {}, action) {
  switch (action.type) {
    case extraConstants.ADD_REQUEST:
      return { addingExtra: true };
    case extraConstants.ADD_SUCCESS:
      return {};
    case extraConstants.ADD_FAILURE:
      return {};
    default:
      return state
  }
}