class errorResponse {
  http_errors = {
    400: 'BAD_REQUEST',
    401: 'UNAUTHORIZED',
    402: 'PAYMENT_REQUIRED',
    403: 'FORBIDDEN',
    404: 'NOT_FOUND',
    405: 'METHOD_NOT_ALLOWED',
    500: 'INTERNAL_ERROR'
  };
	
	constructor(error) {
		this.errorArray = error.toString().split(':').map(item => item.replaceAll('\n',' ').trim());
		this.raw = error.toString().replaceAll('\n',' ').trim()
	}

	getHtmlErrorCode() {
    if( this.http_errors[ Number(this.errorArray[1]) ] === undefined ) this.code = 500
    else this.code = Number(this.errorArray[1]);
		return this.code;
	}

	getErrorResponse() {
		return {
			status: this.errorArray[0] || 'Unspected Error',
			code: this.getHtmlErrorCode(),
			description: this.http_errors[ this.getHtmlErrorCode() ],
			message: this.errorArray[2] || 'No Error Message Available',
			raw: this.raw
		}
	}
}

const errorMiddleware = (error, req, res, next) => {
	const response = new errorResponse(error)
	res.status( response.getHtmlErrorCode() ).json( response.getErrorResponse() );
};

module.exports = {
	errorMiddleware
};