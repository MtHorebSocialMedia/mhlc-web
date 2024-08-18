// Utilities
import { defineStore } from 'pinia';
import { getHttpClient } from '../utils/httpUtils';

const httpClient = getHttpClient();

export const useDonationsStore = defineStore('donations', () => {

    async function getPayPalRequest(request) {
        return (await httpClient.post('/api/donations/paypal', request)).data;
    }

    return { getPayPalRequest };
});

if (import.meta.env.MODE === 'development') {

    console.log('Enabling mock responses for donations store');

    httpClient.addMocks((mock) => {
        mock.onPost("/api/donations/paypal").reply(200, { url: 'https://www.paypal.com' });
    });

}
