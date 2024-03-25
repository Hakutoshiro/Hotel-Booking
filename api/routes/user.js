const express=require('express');
const { handleRegister,
    handleLogin,
    handleAccessProfile,
    handleLogout } = require('../controllers/userControllers');

const userRouter = express.Router();

userRouter.post('/register',handleRegister);
userRouter.post('/login',handleLogin);
userRouter.get('/profile',handleAccessProfile)
userRouter.post('/logout',handleLogout)

module.exports = userRouter