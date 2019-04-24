import { authHeader, config } from '../_helpers';

export const extraService = {
    addExtra,
    getAllExtras,
    uploadImage
};

function addExtra(extra) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(extra)
    };

    return fetch(config.apiUrl + '/extras/add', requestOptions).then(handleResponse, handleError);
}

function uploadImage(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data
    };

    return fetch(config.apiUrl + '/utils/upload_image', requestOptions).then(handleResponse, handleError);
}

function getAllExtras() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/extras/get_all', requestOptions).then(handleResponse, handleError);
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