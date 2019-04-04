import { authHeader, config } from '../_helpers';

export const wearService = {
    getTshirtSizes,
    getFootSizes,
    getTrouserSizes,
}

function getTshirtSizes() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(config.apiUrl + '/tshirt_sizes/sizes', requestOptions).then(handleResponse, handleError);
}

function getTrouserSizes() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(config.apiUrl + '/trouser_sizes/sizes', requestOptions).then(handleResponse, handleError);
}

function getFootSizes() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(config.apiUrl + '/foot_sizes/sizes', requestOptions).then(handleResponse, handleError);
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