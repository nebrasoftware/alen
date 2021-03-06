import { authHeader, config } from '../_helpers';

export const populationsService = {
    getAllProvinces,
    getAllLocalities
}

function getAllProvinces() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(config.apiUrl + '/provinces/get_all', requestOptions).then(handleResponse, handleError);
}

function getAllLocalities() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(config.apiUrl + '/localities/get_all', requestOptions).then(handleResponse, handleError);
}

function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if(response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            // return error message from response body
            response.text().then(text => reject(text));
        }
    });
}

function handleError(error) {
    return Promise.reject(error && error.message);
}