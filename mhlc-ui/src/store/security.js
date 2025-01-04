// Utilities
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getHttpClient, saveAuthToken, clearAuthToken, isAuthenticated, addMocks } from '../utils/httpUtils';

export const useSecurityStore = defineStore('security', () => {

    const isAuthenticatedUser = ref(isAuthenticated());

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
        isAuthenticatedUser.value = isAuthenticated();
        return { authenticated };
    }

    async function logout() {
        clearAuthToken();
        isAuthenticatedUser.value = isAuthenticated();
    }

    return { isAuthenticatedUser, login, logout };
});

if (import.meta.env.MODE === 'development') {

    console.log('Enabling mock responses for mail store');

    addMocks((mock) => {
        mock.onPost("/api/authenticate").reply(200, { authenticated: true }, { 'x-authorization': 'token' });
    });

}
