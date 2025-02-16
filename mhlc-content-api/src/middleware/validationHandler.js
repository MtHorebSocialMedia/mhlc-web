const { BadRequestError } = require('../apiErrors');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { getLogger } = require('../utils/logger');

const logger = getLogger('middleware/validationHandler');

function isNotBlank(data) {
    return (data !== null) && (data !== undefined) && (data.trim().length > 0);
}

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Phone number formatter regex taken from: https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
// Will match on:
// 123-456-7890
// (123) 456-7890
// 123 456 7890
// 123.456.7890
// +91 (123) 456-7890
// 1234567890
ajv.addFormat('phone',  /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/); // Example for a 10-digit US number

ajv.addKeyword({
    type: 'string',
    keyword: 'isNotBlank',
    validate: function(schema, data) {
        return isNotBlank(data);
    },
    errors: false
});
ajv.addKeyword({
    type: 'string',
    keyword: 'matchesProperty',
    validate: function(
        schema, data, parentSchema, dataCxt
    ) {
        return (data === dataCxt.rootData[schema.property]);
    },
    errors: false
});

function validate(obj, schema) {
    const ajvValidate = ajv.compile(schema);
    const valid = ajvValidate(obj);
    const result = {
        valid
    };
    if (!valid) {
        result.errors = {};
        if (ajvValidate.errors) {
            ajvValidate.errors.forEach((error) => {
                let field;
                if (isNotBlank(error.instancePath)) {
                    field = error.instancePath;
                } else {
                    field = isNotBlank(error.schemaPath) && error.schemaPath.includes('#/properties')
                        ? error.schemaPath.split('/')[2]
                        : '';
                }
                field += isNotBlank(error.params.missingProperty)
                    ? '/' + error.params.missingProperty
                    : '';
                field = field[0] === '/' ? field.substring(1) : field;
                field = field.replace(/\//gi, '.');
                if (!result.errors || !result.errors[field]) {
                    result.errors = result.errors || {};
                    result.errors[field] = {
                        failed: {}
                    };
                }
                result.errors[field].failed[error.keyword] = true;
            });
        }
    }
    return result;
}

const getValidationHandler = ({ paramsSchema, bodySchema }) => {
    return function(req, res, next) {
        const results = {};
        if (paramsSchema) {
            results.params = validate(
                req.params,
                paramsSchema
            );
        }
        if (bodySchema) {
            results.body = validate(
                req.body,
                bodySchema
            );
        }
        const valid = (!paramsSchema || (paramsSchema && results.params.valid))
            && (!bodySchema || (bodySchema && results.body.valid));
        if (valid) {
            logger.debug(`Validation for '${req.method.toUpperCase()} ${req.originalUrl}' was successful.`);
            next();
        } else {
            const errorResults = {
                valid,
                errors: {}
            };
            if (results.params && results.params.errors) {
                Object.keys(results.params.errors).forEach((key) => {
                    errorResults.errors[`path.${key}`] = results.params.errors[key];
                });
            }
            if (results.body && results.body.errors) {
                Object.keys(results.body.errors).forEach((key) => {
                    errorResults.errors[`body.${key}`] = results.body.errors[key];
                });
            }
            next(new BadRequestError(errorResults));
        }
    };
};

module.exports = { getValidationHandler };
