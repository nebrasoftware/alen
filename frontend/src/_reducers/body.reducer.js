import { bodyConstants } from '../_constants';
 
export function body(state = {}, action) {
  switch (action.type) {
    case bodyConstants.HAIR_REQUEST:
      return {
        loading: true
      };
    case bodyConstants.HAIR_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        hairs: action.hairColors
      });
    case bodyConstants.HAIR_FAILURE:
      return {
        error: action.error
      };
    case bodyConstants.EYES_REQUEST:
      return {
        loading: true
      };
    case bodyConstants.EYES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        eyes: action.eyesColors
      });
    case bodyConstants.EYES_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}