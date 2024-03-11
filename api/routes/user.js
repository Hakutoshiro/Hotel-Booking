const express=require('express');
const { handleRegister,
    handleLogin,
    handleAccessProfile,
    handleLogout } = require('../controllers/userControllers');

const router = express.Router();

router.post('/register',handleRegister);
router.post('/login',handleLogin);
router.get('/profile',handleAccessProfile)
router.post('/logout',handleLogout)

module.exports = router