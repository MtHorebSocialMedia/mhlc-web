// Utilities
import { defineStore } from 'pinia';
import { getHttpClient, saveAuthToken, addMocks } from '../utils/httpUtils';

export const useSecurityStore = defineStore('security', () => {

    async function login(credentials) {
        const { data, headers } = await getHttpClient().post('/api/authenticate', credentials);
        const { authenticated } = data;
        if (authenticated) {
            const authToken = headers['x-authorization'];
            if (authToken) {
                saveAuthToken(authToken);
            } else {
                throw new Error('Authentication was successful, but the response did not have a valid auth token');
            }
        }
        return { authenticated };
    }

    return { login };
});

if (import.meta.env.MODE === 'development') {

    console.log('Enabling mock responses for mail store');

    addMocks((mock) => {
        mock.onPost("/api/authenticate").reply(200, { authenticated: true }, { 'x-authorization': 'token' });
    });

}
