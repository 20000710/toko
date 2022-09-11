const express = require('express');
const router = express.Router();
const {getAllCSellers, profile, registerSeller, login, updateSeller, deleteSeller} = require('../controller/seller');
const {protect} = require('../middlewares/auth')

router.get('/', getAllCSellers);
router.get('/profile', protect, profile);
router.post('/register', registerSeller);
router.post('/login', login);
router.put('/:id', updateSeller);
router.delete('/:id', deleteSeller);

module.exports = router


