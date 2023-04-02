const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

module.exports = async (req,res) => {
	let getAccounts;
	let getUsers;
	try {
		getAccounts = await prisma.account.findMany({});
		
		if (!getAccounts) {
			return res.status(400).json({
				erro: true,
				msg: 'getAccounts has a null value'
			});
		}

		getUsers = await prisma.user.findMany({});

		if(!getUsers) {
			return res.status(400).json({
				erro: true,
				msg: 'getUsers has a null value'
			});
		}
		
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			erro: true,
			mensagem: `Erro: " + ${error}`,
		});
	}


	return res.json(getAccounts && getUsers);
};
	
