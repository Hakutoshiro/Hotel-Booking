const express=require('express');
const cors=require('cors'); 
const mongoose=require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const router = require('./routes/user');


app.use(express.json());//for parsing json data.
app.use(cookieParser());//for parsing cookie    
// we need cors for communication between express and react app.
console.log(process.env.FRONTEND_URL)
app.use(cors({
        credentials:true,
        origin:process.env.FRONTEND_URL,
    }));

mongoose.connect(process.env.MONGO_URL)

app.use('/',router);


app.listen(4000)