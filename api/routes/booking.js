const express = require('express');
const { handleAddBooking } = require('../controllers/bookingControllers');
const bookingRouter = express.Router();

bookingRouter.post('/addBooking',handleAddBooking)

module.exports = bookingRouter