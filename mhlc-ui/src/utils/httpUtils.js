import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let httpClient = null;
const mockCallbacks = [];
const errorCallbacks = {};

export function getHttpClient() {
    if (!httpClient) {
        const token = getAuthToken();
        createHttpClient(token);
    }
    return httpClient;
}

export function getMockClient() {
    return axios.create();
}

export function saveAuthToken(token) {
    window.localStorage.setItem('MHLC_AUTH_TOKEN', token);
    createHttpClient(token);
}

export function clearAuthToken() {
    window.localStorage.removeItem('MHLC_AUTH_TOKEN');
    createHttpClient();
}

export function isAuthenticated() {
    const authToken = getAuthToken();
    return authToken !== undefined && authToken !== null && authToken.length > 0;
}

export function addMocks(callback) {
    mockCallbacks.push(callback);
}

export function addErrorCallback(errorCode, callback) {
    if (!errorCallbacks[errorCode]) {
        errorCallbacks[errorCode] = [];
    }
    errorCallbacks[errorCode].push(callback);
}

function createHttpClient(token) {
    httpClient = axios.create({
        headers: {
            'x-authorization': token ? `Bearer ${token}` : null
        }
    });
    httpClient.interceptors.response.use(
        // Successful (2XX) responses
        (response) => {
            // do nothing - maybe one day implement success callbacks
            return response;
        },
        // Failed (non-2XX) responses
        (error) => {
            // Execute any registered callbacks for that particular response code
            if (errorCallbacks[error.status]) {
                errorCallbacks[error.status].forEach(callback => {
                    callback();
                });
            }
            return Promise.reject(error);
        }
    );
    if (import.meta.env.MODE === 'development') {
        const mock = new MockAdapter(httpClient, { delayResponse: 1500 });
        mockCallbacks.forEach(callback => callback(mock));
    }
}

function getAuthToken() {
    return window.localStorage.getItem('MHLC_AUTH_TOKEN');
}
