const express = require('express');
const app = express();
const port = process.env.PORT || 3030;
const path = require('path');
const { eAdmin } = require('./middleware/auth.js');
require('dotenv').config();
const createUser = require('./middleware/createUser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bodyParser = require('body-parser');
const cors = require('cors');
const userLogin = require('./middleware/userLogin.js');
const transactionsRegister = require('./middleware/transactionsRegister.js');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.put('/transactions/:id', eAdmin, transactionsRegister);

app.post('/register', createUser);

app.get('/Register', async (req,res) => {
	res.render('/Register');
});

app.post('/login', userLogin);

app.listen(port, () =>
	console.log(
		`Express started on http://localhost:${port}; ` +
      'press CRTL + C to terminate.'
	)
);
