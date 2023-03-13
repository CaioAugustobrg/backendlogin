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
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.put('/transactions/:id', eAdmin, async (req, res) => {
	const {id} = req.params;
	const {balance} = req.body;
	try {
		let updateBalanceById = await prisma.account.update({
			where: {accountId: id},
			data: { balance: balance }
		});

		console.log(updateBalanceById);

		const registerTransactionsOnTransactionsTable  = async () => {
			let registerTransactions = await prisma.transactions.create({
				data: {creditedAccountId: id, debitedAccountId: id, value: balance}
			});	
			res.send(registerTransactions);
		};

		if (updateBalanceById) {
			registerTransactionsOnTransactionsTable();	
		}
		

		
	} catch (error) {
		return res.status(400).json({
			erro: true,
			msg: 'erro: ' + error
		});
	}
});

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
