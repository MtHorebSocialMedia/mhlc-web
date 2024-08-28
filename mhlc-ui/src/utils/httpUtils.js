import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let httpClient = null;

export function getHttpClient() {
    if (!httpClient) {
        httpClient = axios.create();
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
