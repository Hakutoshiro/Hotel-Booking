const express = require('express');
const { handleAddPlace } = require('../controllers/placeControllers');
const placesRouter = express.Router();

placesRouter.post('/',handleAddPlace);

module.exports = placesRouter;