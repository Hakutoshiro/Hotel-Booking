const express=require('express');
const cors=require('cors'); 
const mongoose=require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');


app.use(express.json());//for parsing json data.
app.use(cookieParser());//for parsing cookie    
// we need cors for communication between express and react app.
app.use(cors({
        credentials:true,
        origin:'http://localhost:5173',
    }));

// connecting to the database mongodb 
mongoose.connect(process.env.MONGO_URL)

app.get('/test',(req,res)=>{ 
    res.send('hello')
})

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'asdjfkeojfsdfhejdlfjoaew;jifsdjf;asjf;sajdf;aljfa;lsdjl;asjl;asj;fja;jds;'

app.post('/register',async (req,res)=>{
    const {name,email,password} = req.body; 
    try {
        const Userdoc= await User.create({
            name:name,
            email:email,
            //to send passwords encrypted we are using bcrypt here and for adding bcrypt we used npm add bcryptjs and imported it here.
            password:bcrypt.hashSync(password, bcryptSalt)})   
            res.json(Userdoc);        
    } catch (error) {
        res.status(422).json(error);        
    }
})

app.post('/login',async (req, res) => {
    const {email,password} = req.body;
    try {
        const userDoc= await User.findOne({email});
        if(userDoc){
            const passOk =bcrypt.compareSync(password,userDoc.password);
            if(passOk){
                jwt.sign({email:userDoc.email,id:userDoc._id,name:userDoc.name},jwtSecret,{},(err,token)=>{
                    if(err) throw err;
                    res.cookie('token',token).json(userDoc);                       //we need cookie for specifying which user to log in 
                })
            }else{
                res.status(422).json("pass not ok");
            }
        }else{
            res.json("user not found");
        }
    } catch (error) {
    }
})

app.get('/profile', (req,res)=>{
    const {token} =req.cookies
    if(token){
        jwt.verify(token,jwtSecret,{},async (err,user)=>
        {
            if(err){throw err}
            try {
                const {_id,name,email} = await User.findById(user.id)
                res.json({_id,name,email})
            } catch (error) {
            }
        })
    }
    else {
        res.json(null);
    }
})

app.post('/logout',(req, res)=>{
    res.cookie('token','').json(true);
})



app.listen(4000)