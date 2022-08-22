const express = require('express');
const router = express.Router();
const {register, login, profile, refreshToken} = require('../controller/user');
const {protect} = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.get('/profile', protect, profile);

module.exports = router