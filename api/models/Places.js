const mongoose = require('mongoose');
import { Schema } from 'mongoose';

const PlaceSchema = Schema({
    owner: {type :Schema.Types.ObjectId,ref:'User'},
    title : String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo:String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
});

const PlaceModel =mongoose.model('Place',PlaceSchema);

module.exports = PlaceModel;