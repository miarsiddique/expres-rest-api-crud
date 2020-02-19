var express = require('express');
var router = express.Router();
var ImageToVideoController = require('../app/Controllers/ImageToVideoController');
var upload = require('../public/js/imageMulter');

/* Test Overlay On image. */
router.post('/upload', upload.single('file'), ImageToVideoController.imageUpload);
router.post('/text-overlay', upload.single('file'), ImageToVideoController.TextOverlay);
router.get('/image-to-video', ImageToVideoController.ImageToVideo);

module.exports = router;