// Utilities
import { defineStore } from 'pinia';
import { getHttpClient } from '../utils/httpUtils';

const httpClient = getHttpClient();

export const useMailStore = defineStore('mail', () => {

    async function addMemberToNewsletter(request) {
        return (await httpClient.post('/api/newsletter/signup', request)).data;
    }

    return { addMemberToNewsletter };
});

if (import.meta.env.MODE === 'development') {

    console.log('Enabling mock responses for mail store');

    httpClient.addMocks((mock) => {
        mock.onPost("/api/newsletter/signup").reply(200, { success: true });
    });

}
