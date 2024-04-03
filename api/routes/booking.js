const express = require('express');
const { handleAddBooking, handleGetMyBookings } = require('../controllers/bookingControllers');
const bookingRouter = express.Router();

bookingRouter.get('/',handleGetMyBookings)
bookingRouter.post('/addBooking',handleAddBooking)

module.exports = bookingRouter