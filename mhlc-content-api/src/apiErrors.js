class ApiError {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}

class BadRequestError extends ApiError {
    constructor(validationResult) {
        super(400, 'Bad Request');
        this.validationResult = validationResult;
    }
}

class ConflictError extends ApiError {
    constructor(conflictReason) {
        super(409, 'Conflict');
        this.conflictReason = conflictReason;
    }
}

class NotAuthenticatedError extends ApiError {
    constructor(message) {
        super(401, 'Not Authenticated');
        if (message) {
            this.message = message;
        }
    }
}

class NotAuthorizedError extends ApiError {
    constructor() {
        super(403, 'Not Authorized');
    }
}

class NotFoundError extends ApiError {
    constructor(resource) {
        super(404, 'Not Found');
        this.resource = resource;
    }
}

class SystemError extends ApiError {
    constructor(error) {
        super(500, 'System Error');
        this.error = error;
    }
}

module.exports = {
    BadRequestError,
    ConflictError,
    NotAuthenticatedError,
    NotAuthorizedError,
    NotFoundError,
    SystemError
};
