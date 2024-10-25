import { getHttpClient } from './httpUtils';

const httpClient = getHttpClient();

export function logEvent(eventDetails) {
    httpClient.post('/api/audit', eventDetails);
}

if (import.meta.env.MODE === 'development') {

    console.log('Enabling mock responses for audit service');

    httpClient.addMocks((mock) => {
        mock.onGet("/api/audit").reply(() => {
            return [200];
        });
    });
}
