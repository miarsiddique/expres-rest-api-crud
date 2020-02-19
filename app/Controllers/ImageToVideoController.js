
module.exports = {

   imageUpload: (req, res, next) => {
      console.log(req);
      if (!req.file) {
         res.status(500);
         return next(err);
      }
      res.json({ fileUrl: 'http://localhost:4000/images/' + req.file.filename });
	},

	TextOverlay: (req, res, next) => {
      res.status(200).send(req.body.text);
	},

	ImageToVideo: (req, res, next) => {

	}
}