const express = require('express');
const app = express();
const port = process.env.PORT || 3030;
const path = require('path');
const { eAdmin } = require('./middleware/auth.js');
require('dotenv').config();
const createUser = require('./controllers/createUser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bodyParser = require('body-parser');
const cors = require('cors');
const userLogin = require('./controllers/userLogin.js');
const transactionsRegister = require('./middleware/transactionsRegister.js');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
const router = require('../src/routes/routes');

app.use(router);

app.use('/transactions/:id', transactionsRegister ,router);

app.use('/register',createUser , router);


app.use('/login', userLogin, router);

app.listen(port, () =>
	console.log(
		`Express started on http://localhost:${port}; ` +
      'press CRTL + C to terminate.'
	)
);
