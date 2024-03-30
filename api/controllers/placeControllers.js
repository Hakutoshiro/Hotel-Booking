const Place = require("../models/Places");
const jwt = require("jsonwebtoken");
const jwtSecret = "asdjfkeojfsdfhejdlfjoaew;jifsdjf;asjf;sajdf;aljfa;lsdjl;asjl;asj;fja;jds;";

const handleAddPlace = async (req, res) => {
    const { token } = req.cookies;
    const {
        title, address, description,
        perks, checkIn, checkOut,
        extraInfo, maxGuests, addedPhotos,price
    } = req.body;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if (err) throw err;
            try {
                const addedPlace = await Place.create({
                    owner: user.id,
                    title: title,
                    address: address,
                    photos: addedPhotos,
                    description: description,
                    perks: perks,
                    extraInfo: extraInfo,
                    checkIn: checkIn,
                    checkOut: checkOut,
                    maxGuests: maxGuests,
                    price: price,
                });
                res.json(addedPlace);
            } catch (error) {
                throw error;
            }
        });
    }

};

const getAddedPlaces = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        const { token } = req.cookies;
        if (token) {
            jwt.verify(token, jwtSecret, {}, async (err, user) => {
                if (err) throw err;
                try {
                    const addedPlacesData = await Place.find({ owner: user.id });
                    res.json(addedPlacesData);
                } catch (error) {
                    throw error;
                }
            })
        }
    } else {
        try {
            const placeData = await Place.findById(id);
            res.json(placeData);
        } catch (error) {
            throw error;
        }
    }
}

const handleUpdatePlace = async (req, res) => {
    const { token } = req.cookies
    const {
        title, address, description,
        perks, checkIn, checkOut,
        extraInfo, maxGuests, addedPhotos, id,price
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, data) => {
        if (err) throw err;
        try {
            const placeDoc =await Place.findById(id);
            if (data.id === String(placeDoc.owner)) {
                placeDoc.set({
                    title: title,
                    address: address,
                    photos: addedPhotos,
                    description: description,
                    perks: perks,
                    extraInfo: extraInfo,
                    checkIn: checkIn,
                    checkOut: checkOut,
                    maxGuests: maxGuests,
                    price: price
                })
                await placeDoc.save();
                res.json('ok');
            }
        } catch (error) {
            throw error;
        }
    })
}

const getPhotos = async (req, res) => {
    const { id } = req.params;
    try {
        const placeData = await Place.findById(id);
        res.json(placeData.photos);
    } catch (error) {
        throw error;
    }
}

const getAllPlaces = async (req,res) => {
    try {
        const placeData = await Place.find();
        res.json(placeData);
    } catch (error) {
        throw error;
    }    
}

module.exports = { handleAddPlace, getAddedPlaces, handleUpdatePlace,getPhotos ,getAllPlaces} 