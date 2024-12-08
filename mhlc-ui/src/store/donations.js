// Utilities
import { defineStore } from 'pinia';
import { getHttpClient, addMocks } from '../utils/httpUtils';

export const useDonationsStore = defineStore('donations', () => {

    async function getPayPalRequest(request) {
        return (await getHttpClient().post('/api/donations/paypal', request)).data;
    }

    return { getPayPalRequest };
});

if (import.meta.env.MODE === 'development') {

    console.log('Enabling mock responses for donations store');

    addMocks((mock) => {
        mock.onPost("/api/donations/paypal").reply(200, { url: 'https://www.paypal.com' });
    });

}
