import { bodyConstants } from '../_constants';
import { bodyService } from '../_services';

export const bodyActions = {
    getHairColors,
    getEyesColors
};

function getHairColors() {
    return dispatch => {
        dispatch(request());

        bodyService.getHairColors()
            .then(
                hairColors => dispatch(success(hairColors)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: bodyConstants.HAIR_REQUEST } }
    function success(hairColors) { return { type: bodyConstants.HAIR_SUCCESS, hairColors } }
    function failure(error) { return { type: bodyConstants.HAIR_FAILURE, error } }
}

function getEyesColors() {
    return dispatch => {
        dispatch(request());

        bodyService.getEyesColors()
            .then(
                eyesColors => dispatch(success(eyesColors)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: bodyConstants.EYES_REQUEST } }
    function success(eyesColors) { return { type: bodyConstants.EYES_SUCCESS, eyesColors } }
    function failure(error) { return { type: bodyConstants.EYES_FAILURE, error } }
}