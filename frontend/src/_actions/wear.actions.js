import { wearConstants } from '../_constants';
import { wearService } from '../_services';

export const wearActions = {
    getTshirtSizes,
    getTrouserSizes,
    getFootSizes,
};

function getTshirtSizes() {
    return dispatch => {
        dispatch(request());

        wearService.getTshirtSizes()
            .then(
                tshirt => dispatch(success(tshirt)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: wearConstants.TSHIRT_REQUEST } }
    function success(tshirt) { return { type: wearConstants.TSHIRT_SUCCESS, tshirt } }
    function failure(error) { return { type: wearConstants.TSHIRT_FAILURE, error } }
}

function getTrouserSizes() {
    return dispatch => {
        dispatch(request());

        wearService.getTrouserSizes()
            .then(
                trouser => dispatch(success(trouser)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: wearConstants.TROUSER_REQUEST } }
    function success(trouser) { return { type: wearConstants.TROUSER_SUCCESS, trouser } }
    function failure(error) { return { type: wearConstants.TROUSER_FAILURE, error } }
}

function getFootSizes() {
    return dispatch => {
        dispatch(request());

        wearService.getFootSizes()
            .then(
                foot => dispatch(success(foot)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: wearConstants.FOOT_REQUEST } }
    function success(foot) { return { type: wearConstants.FOOT_SUCCESS, foot } }
    function failure(error) { return { type: wearConstants.FOOT_FAILURE, error } }
}