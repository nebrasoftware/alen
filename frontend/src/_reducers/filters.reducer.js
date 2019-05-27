let initialState = {
  ageFilter: [],
  provinceFilter: '',
  heightFilter: [],
  weightFilter: [],
  drivingLicenseFilter: false,
  eyesColorFilter: '',
  hairColorFilter: ''
}

export function visibilityFilter(state = {}, action) {
  switch (action.type) {
    case filtersConstants.GET_EXTRAS_FILTERED_REQUEST:
      return {
        loading: true
      };
    case filtersConstants.GET_EXTRAS_FILTERED_SUCCESS:
      return {
        loading: true
      };
    case filtersConstants.GET_EXTRAS_FILTERED_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}