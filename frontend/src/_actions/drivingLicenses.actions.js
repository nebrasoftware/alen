import { drivingLicensesConstants } from '../_constants';
import { drivingLicensesService } from '../_services';

export const drivingLicensesActions = {
    getAllLicenses
};

function getAllLicenses() {
    return dispatch => {
        dispatch(request());

        drivingLicensesService.getAllLicenses()
            .then(
                types => dispatch(success(types)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: drivingLicensesConstants.LICENSES_REQUEST } }
    function success(types) { return { type: drivingLicensesConstants.LICENSES_SUCCESS, types } }
    function failure(error) { return { type: drivingLicensesConstants.LICENSES_FAILURE, error } }
}
