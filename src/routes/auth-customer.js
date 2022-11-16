const express = require('express');
const router = express.Router();
const { register, login, refreshToken } = require('../controller/auth-customer');
const { protect } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', protect, refreshToken);

module.exports = router