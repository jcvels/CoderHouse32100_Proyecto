const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
};

const errorResponse = (message, details = null) => {
    return {
        success: false,
        message,
        details
    }
}

class HttpError {
    constructor(status, message, details) {
        this.statusCode = status;
        this.message = message;
        this.details = details;
    }
};

const errorMiddleware = (error, req, res, next) => {
  const errorStatus = error.statusCode || HTTP_STATUS.INTERNAL_ERROR;
  const errorMessage = error.message || "There was an unexpected error";
  const errorDetails = error.message ? null : error; 
  return res.status(errorStatus).json(errorResponse(errorMessage, errorDetails));
}

module.exports = errorMiddleware;