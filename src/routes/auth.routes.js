const createUser = require('../controllers/createUser');
const userLogin = require('../controllers/userLogin');
const express = require('express');
const AuthRouter = express.Router();

AuthRouter.post('/register', createUser);

AuthRouter.post('/login', userLogin);

module.exports = AuthRouter;