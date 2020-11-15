export class HTTPBadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "HTTPBadRequestError";
        this.code = 400;
    }
}

export class HTTPUnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = "HTTPUnauthorizedError";
        this.code = 401;
    }
}
export class HTTPForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = "HTTPForbiddenError";
        this.code = 403;
    }
}
export class HTTPNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "HTTPNotFoundError";
        this.code = 404;
    }
}

export class HTTPInternalServerError extends Error {
    constructor(message) {
        super(message);
        this.name = "HTTPInternalServerError";
        this.code = 500;
    }
}

export const HTTPErrors = {
    HTTPBadRequestError,
    HTTPUnauthorizedError,
    HTTPForbiddenError,
    HTTPNotFoundError,
    HTTPInternalServerError,
};

export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

export class DuplicationError extends Error {
    constructor(message) {
        super(message);
        this.name = "DuplicationError";
    }
}

export class InvalidArgumentError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidArgumentError";
    }
}

export class TypeError extends Error {
    constructor(message) {
        super(message);
        this.name = "TypeError";
    }
}
