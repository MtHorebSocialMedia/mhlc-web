// Utilities
import { defineStore } from 'pinia';
import { getHttpClient, addMocks } from '../utils/httpUtils';

export const useMailStore = defineStore('mail', () => {

    async function addMemberToNewsletter(request) {
        return (await getHttpClient().post('/api/newsletter/signup', request)).data;
    }

    return { addMemberToNewsletter };
});

if (import.meta.env.MODE === 'development') {

    console.log('Enabling mock responses for mail store');

    addMocks((mock) => {
        mock.onPost("/api/newsletter/signup").reply(200, { success: true });
    });

}
