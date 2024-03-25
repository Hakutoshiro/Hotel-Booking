const Place = require("../models/Places");
const jwt = require("jsonwebtoken");
const jwtSecret ="asdjfkeojfsdfhejdlfjoaew;jifsdjf;asjf;sajdf;aljfa;lsdjl;asjl;asj;fja;jds;";

const handleAddPlace = async (req, res) => {
    const { token } = req.cookies;
    const {
        title,address,description,
        perks,checkIn,checkOut,
        extraInfo ,maxGuests,addedPhotos
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
                    maxGuests: maxGuests
                });
                res.json(addedPlace);
            } catch (error) {
                throw error;
            }
        });
    }
    
};

module.exports = {handleAddPlace}