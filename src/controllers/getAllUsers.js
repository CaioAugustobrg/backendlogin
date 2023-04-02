const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

module.exports = async (req,res) => {
	let getUsers;
	try {

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
	console.log(getUsers);


	return res.json(getUsers);
};