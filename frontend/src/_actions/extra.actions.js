import { extraConstants } from '../_constants';
import { extraService } from '../_services';

export const extraActions = {
    add,
    getAll,
    uploadImage
};

function add(extra) {
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

function uploadImage(data) {
    return dispatch => {
        dispatch(request());

        extraService.uploadImage(data)
            .then(
                data => {
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(data) { return { type: extraConstants.UPLOAD_IMAGE_REQUEST, data } }
    function success(data) { return { type: extraConstants.UPLOAD_IMAGE_SUCCESS, data } }
    function failure(error) { return { type: extraConstants.UPLOAD_IMAGE_FAILURE, error } }
}

function getAll() {
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