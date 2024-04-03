const BookingModel = require("../models/Bookings");
const jwt = require('jsonwebtoken');
const jwtSecret = 'asdjfkeojfsdfhejdlfjoaew;jifsdjf;asjf;sajdf;aljfa;lsdjl;asjl;asj;fja;jds;'

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

const handleGetMyBookings = async (req,res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,jwtSecret,{},async (err,user)=>{
            if(err) throw err;
            try {
                const bookings = await BookingModel.find({user:user.id}).populate('place')
                res.json(bookings)
            } catch (error) {
                throw error;
            }
        })
    }else{
        res.json(null);
    }
}

module.exports = {handleAddBooking,handleGetMyBookings}