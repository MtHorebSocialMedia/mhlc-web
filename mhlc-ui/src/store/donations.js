// Utilities
import { defineStore } from 'pinia';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const useDonationsStore = defineStore('donations', () => {

    async function getPayPalRequest(request) {
        return (await axios.post('/api/donations/paypal', request)).data;
    }

    return { getPayPalRequest };
});

console.log('MODE:', import.meta.env.MODE);

if (import.meta.env.MODE === 'development') {

    console.log('Enabling mock responses for donations store');

    // This sets the mock adapter on the default instance
    // TODO move this out - not sure that I can create two mock adapter instances
    const mock = new MockAdapter(axios);

    mock.onGet("/api/donations/paypal").reply(200, { url: 'https://www.paypal.com' });

}
