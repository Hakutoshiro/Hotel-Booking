const express = require('express');
const { handleAddPlace, getAddedPlaces, handleUpdatePlace, getPhotos, getAllPlaces   } = require('../controllers/placeControllers');
const placesRouter = express.Router();

placesRouter.post('/',handleAddPlace);
placesRouter.put('/',handleUpdatePlace);
placesRouter.get('/:id?',getAddedPlaces)
placesRouter.get('/photos/:id',getPhotos)
placesRouter.get('/getallPlaces/allPlaces',getAllPlaces)

module.exports = placesRouter; 