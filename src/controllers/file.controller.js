const multer = require('multer')
const path = require('path');

const upload = (req, res, next) => {
	
	const storage = multer.diskStorage({
		destination: function (req, file, cb) { cb(null, path.join(__dirname, '../public/avatars') ) },
		filename: function (req, file, cb) { cb(null, `${ Date.now() }.jpg`) }
	})
	
	const multerUpload = multer({ storage: storage }).single('avatar');

	try {
		multerUpload(req, res, (err) => next() )
	}
	catch (error) { next(error) }

};

module.exports = {
	upload
}