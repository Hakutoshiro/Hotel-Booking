const express=require('express');
const cors=require('cors'); 
const mongoose=require('mongoose');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user');
const placesRouter = require('./routes/places');
const bookingRouter = require('./routes/booking');

app.use(express.json());    //for parsing json data.
 
app.use(cookieParser());//for parsing cookie    
// we need cors for communication between express and react app.
app.use('/uploads',express.static('./uploads'))
app.use(cors({  
        credentials:true,
        origin:process.env.FRONTEND_URL,
    }));

mongoose.connect(process.env.MONGO_URL)

 
app.use('/',userRouter);
app.use('/places',placesRouter)
app.use('/bookings',bookingRouter)

app.listen(4000)