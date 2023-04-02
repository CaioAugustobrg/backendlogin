const express = require('express');
const createUser = require('../controllers/createUser');
const userLogin = require('../controllers/userLogin');
const { eAdmin } = require('../middleware/auth');
const transactionsRegister = require('../controllers/transactionsRegister');
const getAllAccounts = require('../controllers/getAllAccounts');
const getAllUsers = require('../controllers/getAllUsers');
const router = express.Router();

router.put('/transactions/:debitedAccountId', eAdmin, transactionsRegister);

router.post('/register', createUser);

router.post('/login', userLogin);

router.get('/getAllAccounts:id',eAdmin, getAllAccounts);

router.get('/getAllUsers', eAdmin, getAllUsers);

module.exports = router;