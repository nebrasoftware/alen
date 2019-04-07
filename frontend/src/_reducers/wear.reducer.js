import { wearConstants } from '../_constants';
 
export function wear(state = {}, action) {
  switch (action.type) {
    case wearConstants.TSHIRT_REQUEST:
      return {
        loading: true
      };
    case wearConstants.TSHIRT_SUCCESS:
      return {
        tshirts: action.tshirt
      };
    case wearConstants.TSHIRT_FAILURE:
      return {
        error: action.error
      };
    case wearConstants.TROUSER_REQUEST:
      return {
        loading: true
      };
    case wearConstants.TROUSER_SUCCESS:
      return {
        trousers: action.trouser
      };
    case wearConstants.TROUSER_FAILURE:
      return {
        error: action.error
      };
    case wearConstants.FOOT_REQUEST:
      return {
        loading: true
      };
    case wearConstants.FOOT_SUCCESS:
      return {
        foots: action.foot
      };
    case wearConstants.FOOT_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}