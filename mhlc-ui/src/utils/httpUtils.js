import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let httpClient = null;

export function getHttpClient() {
    if (!httpClient) {
        httpClient = axios.create();
        if (import.meta.env.MODE === 'development') {
            const mock = new MockAdapter(httpClient);
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
