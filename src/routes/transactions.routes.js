const express = require('express');
const { eAdmin } = require('../middleware/auth');
const transactionsRouter = express.Router();
const transactionsRegister = require('../controllers/transactionsRegister');


transactionsRouter.put('/transactions/:debitedAccountId', eAdmin, transactionsRegister);

module.exports = transactionsRouter;
