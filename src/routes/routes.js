const express = require('express');
const createUser = require('../controllers/createUser');
const userLogin = require('../controllers/userLogin');
const { eAdmin } = require('../middleware/auth');
const transactionsRegister = require('../middleware/transactionsRegister');
const router = express.Router();

router.put('/transactions/:id', eAdmin, transactionsRegister);

router.post('/register', createUser);

router.post('/login', userLogin);

module.exports = router;