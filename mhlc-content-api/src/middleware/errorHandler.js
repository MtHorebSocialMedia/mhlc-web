const { SystemError, BadRequestError, ConflictError } = require('../apiErrors');
const { getLogger } = require('../utils/logger');

const logger = getLogger('errorHandler');

const getErrorHandler = () => {
    return (
        err,
        req,
        res,
        next
    ) => {

        if (err.statusCode && err.message) {
            const resourceError = err;
            if (resourceError instanceof SystemError) {
                logger.error(
                    'A system error was encountered',
                    resourceError.error
                );
            }
            res.status(resourceError.statusCode);
            if (resourceError instanceof BadRequestError
                && resourceError.validationResult) {
                res.json(resourceError.validationResult);
            } else if (resourceError instanceof ConflictError
                && resourceError.conflictReason) {
                res.json({ ...resourceError });
            } else {
                res.send(resourceError.message);
            }
        } else {
            logger.error(
                'An unexpected error was encountered',
                err
            );
            next(err);
        }
    };
};

module.exports = { getErrorHandler };
