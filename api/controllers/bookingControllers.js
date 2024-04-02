const BookingModel = require("../models/Bookings");

const handleAddBooking = async (req,res) =>{
    const {place,checkIn,checkOut,name,guestsNo,mobile,price,user} = req.body;
    try {
        const bookingDoc = await BookingModel.create({
            place:place,
            checkIn:checkIn,
            checkOut:checkOut,
            name:name,
            guestsNo:guestsNo,
            mobile:mobile,
            price:price,
            user:user._id,
        });
        res.json(bookingDoc)
    } catch (error) {
        throw error;
    }
}

module.exports = {handleAddBooking}