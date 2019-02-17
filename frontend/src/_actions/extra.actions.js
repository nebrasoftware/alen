import { extraConstants } from '../_constants';
import { extraService } from '../_services';

export const extraActions = {
    addExtra
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