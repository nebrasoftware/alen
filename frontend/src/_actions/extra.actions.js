import { extraConstants } from '../_constants';
import { extraService } from '../_services';

export const extraActions = {
    add,
    getAll,
    uploadImages
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

function uploadImages() {
    return dispatch => {
        dispatch(request());

        extraService.uploadImages(image)
            .then(
                image => {
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(image) { return { type: extraConstants.UPLOAD_IMAGE_REQUEST, image } }
    function success(image) { return { type: extraConstants.UPLOAD_IMAGE_SUCCESS, image } }
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