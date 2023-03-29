const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

module.exports = async (req,res) => {
	try {
		const getAccounts = await prisma.account.findMany({});
		
		if (!getAccounts) {
			return res.status(400).json({
				erro: true,
				msg: 'getAccounts has a null value'
			});
		}

		const getUsers = await prisma.user.findMany({});

		if(!getUsers) {
			return res.status(400).json({
				erro: true,
				msg: 'getUsers has a null value'
			});
		}
		return res.json(getAccounts && getUsers);
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			erro: true,
			mensagem: `Erro: " + ${error}`,
		});
	}


	
};
	
