import { extraConstants } from '../_constants';
import { extraService } from '../_services';

export const extraActions = {
    addExtra,
    getAllExtras
};

function addExtra(extra) {
    return dispatch => {
        dispatch(request(extra));

        extraService.addExtra(extra)
            .then(
                extra => {
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(extra) { return { type: extraConstants.ADD_REQUEST, extra } }
    function success(extra) { return { type: extraConstants.ADD_SUCCESS, extra } }
    function failure(error) { return { type: extraConstants.ADD_FAILURE, error } }
}

function getAllExtras() {
    return dispatch => {
        dispatch(request());

        extraService.getAllExtras()
            .then(
                extras => dispatch(success(extras)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: extraConstants.GETALL_REQUEST } }
    function success(extras) { return { type: extraConstants.GETALL_SUCCESS, extras } }
    function failure(error) { return { type: extraConstants.GETALL_FAILURE, error } }
}