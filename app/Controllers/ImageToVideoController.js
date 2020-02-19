var Jimp = require('jimp');
var fs = require('fs');
var path = require('path');

module.exports = {

	/**
	 * image upload using multers
	 * @param  req
	 * @param  res
	 * @param  next
	 * @return
	 */
    imageUpload: (req, res, next) => {
      console.log(req);
      if (!req.file) {
         res.status(500);
         return next(err);
      }
      res.json({ fileUrl: 'http://localhost:4000/images/' + req.file.filename });
	},

	/**
	 * test onto image
	 * @param  req
	 * @param  res
	 * @param  next
	 * @return
	 */
	TextOverlay: (req, res, next) => {
      var fileName =  'http://localhost:4000/images/' + req.file.filename;
		var imageCaption = 'Welcome Irshad Alam 2';
      console.log(req.body.message)
		Jimp.read(fileName)
			.then(function (image) {
				var path = require('path');
				Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(function (font) {
					image.print(font, 10, 10, imageCaption)
					image.color([
					  { apply: 'hue', params: [-90] },
					]);
					image.write(val = 'public/images/'+'image-' + Date.now() + '.' +'jpg');
					res.json({
						success: 'Image Saved Successfully!!',
						message: 'messages',
					});
				});
			})
			.catch(function (err) {
				console.error(err);
			});
	},

	/**
	 * image to video create
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	ImageToVideo: (req, res, next) => {

	}
}