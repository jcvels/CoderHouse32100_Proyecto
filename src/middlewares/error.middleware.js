const HTTP_STATUS = {
	200: 'OK' ,
	201: 'CREATED',
	400: 'BAD_REQUEST',
	404: 'NOT_FOUND',
	500: 'INTERNAL_ERROR'
};

const response = {
	status: 'Error' ,
	code: 500,
	description: HTTP_STATUS[500],
	message: 'Unspected error',
	raw: ''
}

const errorMiddleware = (error, req, res, next) => {
	errorArray = error.toString().split(':').map(item => item.trim()) ; console.log( errorArray )
	
	response.status = errorArray[0]
	response.message = errorArray[1]
	response.code = Number(errorArray[2])
	response.description = HTTP_STATUS[Number(errorArray[2])]
	response.raw = error.toString()

	return res.status(response.code).json(response);
};

module.exports = errorMiddleware;