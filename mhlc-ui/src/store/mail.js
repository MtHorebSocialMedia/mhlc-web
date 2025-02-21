// Utilities
import { defineStore } from 'pinia';
import { getHttpClient, addMocks } from '../utils/httpUtils';

export const useMailStore = defineStore('mail', () => {

    async function addMemberToNewsletter(request) {
        return (await getHttpClient().post('/api/newsletter/signup', request)).data;
    }

    async function sendContactRequest(request) {
        return (await getHttpClient().post('/api/contact', request)).data;
    }

    return { addMemberToNewsletter, sendContactRequest };
});

if (import.meta.env.MODE === 'development') {

    console.log('Enabling mock responses for mail store');

    addMocks((mock) => {
        mock.onPost("/api/newsletter/signup").reply(200, { success: true });
        mock.onPost("/api/contact").reply(200, { success: true });
    });

}
