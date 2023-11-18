const express = require('express');
const { eAdmin } = require('../middleware/auth');
const getAllAccounts = require('../controllers/getAllAccounts');
const getAllUsers = require('../controllers/getAllUsers');
const AuthRouter = require('./auth.routes');
const transactionsRouter = require('./transactions.routes');
const router = express.Router();


router.get('/getAllAccounts/:id',eAdmin, getAllAccounts);

router.use('/auth', AuthRouter);
router.use('/', transactionsRouter);
router.get('/getAllUsers', eAdmin, getAllUsers);

module.exports = router;