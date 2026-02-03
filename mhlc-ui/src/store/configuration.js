// Utilities
import { defineStore } from 'pinia';
import { getHttpClient, addMocks } from '../utils/httpUtils';

export const useConfigurationStore = defineStore('configuration', () => {

    async function getConfiguration() {
        return (await getHttpClient().get('/api/configuration')).data;
    }

    return { getConfiguration };
});

if (import.meta.env.MODE === 'development') {

    console.log('Enabling mock responses for configuration store');

    addMocks((mock) => {
        mock.onGet("/api/configuration").reply(200, { enableTrafficTracking: false });
    });

}
