const createUser = require('../controllers/createUser');
const userLogin = require('../controllers/userLogin');
const express = require('express');
const bodyValidation = require('../utils/bodyValidation');
const AuthRouter = express.Router();
const {loginSchema, registrationSchema} = require('./validators/user.validator');

AuthRouter.post('/register',[bodyValidation(registrationSchema)], createUser);

AuthRouter.post('/login', [bodyValidation(loginSchema)], userLogin);

module.exports = AuthRouter;