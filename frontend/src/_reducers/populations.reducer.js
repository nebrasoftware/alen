import { populationsConstants } from '../_constants';
 
export function populations(state = {}, action) {
  switch (action.type) {
    case populationsConstants.LOCALITIES_REQUEST:
      return {
        loading: true
      };
    case populationsConstants.LOCALITIES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        localities: action.localities
      });
    case populationsConstants.LOCALITIES_FAILURE:
      return {
        error: action.error
      };
    case populationsConstants.PROVINCES_REQUEST:
      return {
        loading: true
      };
    case populationsConstants.PROVINCES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        provinces: action.provinces
      });
    case populationsConstants.PROVINCES_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}