import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let httpClient = null;

export function getHttpClient() {
    if (!httpClient) {
        const token = getAuthToken();
        createHttpClient(token);
        if (import.meta.env.MODE === 'development') {
            const mock = new MockAdapter(httpClient, { delayResponse: 1500 });
            httpClient.addMocks = (callback) => {
                callback(mock);
            }
        }
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

export function isAuthenticated() {
    const authToken = getAuthToken();
    return authToken !== undefined && authToken !== null && authToken.length > 0;
}

function createHttpClient(token) {
    httpClient = axios.create({
        headers: {
            'x-authorization': token ? `Bearer ${token}` : null
        }
    });
}

function getAuthToken() {
    return window.localStorage.getItem('MHLC_AUTH_TOKEN');
}
