import Ajv from 'ajv';
import addFormats from 'ajv-formats';

function isNotBlank(data) {
    return (data !== null) && (data !== undefined) && (data.trim().length > 0);
}

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
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

export function validate(obj, schema) {
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