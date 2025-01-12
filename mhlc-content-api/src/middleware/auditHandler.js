const { getLogger } = require('../utils/logger');
const { writeEvent } = require('../services/analyticsService');

const logger = getLogger('middleware/auditHandler');

const getAuditHandler = () => {
    return (
        req,
        res,
        next
    ) => {
        const start = new Date().getTime();
        res.on('finish', () => {

            let statusCode, method, resourceType, resource, duration;
            if (req.originalUrl === '/api/audit') {
                statusCode = 200;
                method = 'GET';
                resourceType = req.body.type;
                resource = req.body.uri;
                duration = '';
            } else {
                const end = new Date().getTime();
                duration = `${end - start}`;
                statusCode = res.statusCode;
                method = req.method;
                resourceType = req.originalUrl.startsWith('/api/') ? 'api' : '';
                resource = req.originalUrl;
            }
            if (resourceType && resourceType !== '') {
                logger.info(`${statusCode} ${method.padEnd(4, ' ')} ${resourceType.padEnd(6, ' ')} ${resource} ${duration}`);
                const ip = req.ip;
                const referrer = req.get('Referer');
                const userAgent = req.get('User-Agent');
                writeEvent({
                    dateTime: new Date().toISOString(),
                    statusCode,
                    method,
                    resourceType,
                    resource,
                    duration,
                    referrer,
                    ip,
                    userAgent
                });
            }
        });
        next();
    };
};

module.exports = { getAuditHandler };
