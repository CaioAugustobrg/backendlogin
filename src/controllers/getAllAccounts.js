const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

module.exports = async (req,res) => {
	let getAccounts;
	const {user_id} = await req.params;
	try {
		getAccounts = await prisma.account.findFirst({
			where: {id: user_id},
			select: {balance: true}
		});
		
		if (!getAccounts) {
			return res.status(400).json({
				erro: true,
				msg: 'getAccounts has a null value'
			});
		}

	} catch (error) {
		console.log(error);
		return res.status(400).json({
			erro: true,
			mensagem: `Erro: " + ${error}`,
		});
	}
	console.log(getAccounts);

	return res.json(getAccounts);
};
	
