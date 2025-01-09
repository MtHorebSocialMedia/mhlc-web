import { getHttpClient, addMocks } from './httpUtils';

export function logEvent(eventDetails) {
    getHttpClient().post('/api/audit', eventDetails);
}

export async function getEvents(monthId) {
    return (await getHttpClient().get('/api/audit/events', { params: { monthId } })).data;
}

if (import.meta.env.MODE === 'development') {

    console.log('Enabling mock responses for audit service');

    addMocks((mock) => {
        mock.onPost("/api/audit").reply(() => {
            return [200];
        });
        mock.onGet("/api/audit/events").reply(() => {
            return [200, []];
        });
    });
}
