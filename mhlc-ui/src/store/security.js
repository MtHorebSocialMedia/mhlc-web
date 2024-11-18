// Utilities
import { defineStore } from 'pinia';
import { getHttpClient } from '../utils/httpUtils';

const httpClient = getHttpClient();

export const useSecurityStore = defineStore('security', () => {

    async function login(credentials) {
        return (await httpClient.post('/api/authenticate', credentials)).data;
    }

    return { login };
});

if (import.meta.env.MODE === 'development') {

    console.log('Enabling mock responses for mail store');

    httpClient.addMocks((mock) => {
        mock.onPost("/api/authenticate").reply(200, { authenticated: true });
    });

}
