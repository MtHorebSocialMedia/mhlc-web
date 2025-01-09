const log4js = require('log4js');

let configured = false;

function configure() {
    configured = true;
    const level = process.env.LOG_LEVEL || 'info';
    log4js.configure({
        appenders: { out: { type: 'stdout' } },
        categories: {
            default: {
                appenders: [ 'out' ],
                level
            }
        }
    });
    getLogger('logger').info(`mhlc-web logging configured at level: ${level.toUpperCase()}`);
}

function getLogger(name) {
    if (!configured) {
        configure();
    }
    return log4js.getLogger(name);
}

module.exports = {
    getLogger
};
