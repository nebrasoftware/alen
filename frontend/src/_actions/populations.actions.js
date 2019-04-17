import { populationsConstants } from '../_constants';
import { populationsService } from '../_services';

export const populationsActions = {
    getAllLocalities,
    getAllProvinces
};

function getAllLocalities() {
    return dispatch => {
        dispatch(request());

        populationsService.getAllLocalities()
            .then(
                localities => dispatch(success(localities)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: populationsConstants.LOCALITIES_REQUEST } }
    function success(localities) { return { type: populationsConstants.LOCALITIES_SUCCESS, localities } }
    function failure(error) { return { type: populationsConstants.LOCALITIES_FAILURE, error } }
}

function getAllProvinces() {
    return dispatch => {
        dispatch(request());

        populationsService.getAllProvinces()
            .then(
                provinces => dispatch(success(provinces)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: populationsConstants.PROVINCES_REQUEST } }
    function success(provinces) { return { type: populationsConstants.PROVINCES_SUCCESS, provinces } }
    function failure(error) { return { type: populationsConstants.PROVINCES_FAILURE, error } }
}