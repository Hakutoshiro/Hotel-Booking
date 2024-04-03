const express = require('express')
const { handlePhotoUploadByLink ,handlePhotoUpload, handleDeletePhoto } = require('../controllers/photoUploadControllers')
const photosUploadRouter = express.Router()
const multer = require('multer');
const path= require('path');

const photoMiddleware = multer({dest:path.join( __dirname,'..','uploads/')})

photosUploadRouter.post('/upload-by-link',handlePhotoUploadByLink)
photosUploadRouter.post('/upload',photoMiddleware.array('photos',100),handlePhotoUpload)
photosUploadRouter.delete('/_/:filename?',handleDeletePhoto)


module.exports = photosUploadRouter