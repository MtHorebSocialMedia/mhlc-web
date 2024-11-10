import { getHttpClient } from './httpUtils';

const httpClient = getHttpClient();

export function logEvent(eventDetails) {
    httpClient.post('/api/audit', eventDetails);
}

export async function getEvents() {
    return (await httpClient.get('/api/audit/events')).data;
}

if (import.meta.env.MODE === 'development') {

    console.log('Enabling mock responses for audit service');

    httpClient.addMocks((mock) => {
        mock.onPost("/api/audit").reply(() => {
            return [200];
        });
    });

    httpClient.addMocks((mock) => {
        mock.onGet("/api/audit/events").reply(() => {
            return [200, []];
        });
    });
}
