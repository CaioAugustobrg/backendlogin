
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));



module.exports = async (req, res) => {  
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	});

	console.log(req.body);
	const {  username, password, email, id} = req.body;
	
	const hashPassword = await bcrypt.hash(password, 8);
	let token = jwt.sign({ id: 1 }, 'AS3O20A193KS39DJANVN81937G', {
		expiresIn: '7d',
	});

	try {

		let userId = await prisma.user.findFirst({
			where: {id: id}
		});
		console.log(userId);
		if (userId === null) return res.json({msg: 'sssss'});

		let user = await prisma.user.findFirst({
			where: {
				email: email,
				username: username
  
			},
		});

		if (user.email === null || user.username === null) {
			return res.status(404).json({
				erro: true,
				mensagem: 'Erro: Email, usuário ou senha incorreto(s)!',
			});
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(404).json({
				erro: true,
				mensagem: 'Erro: Email, usuário ou senha incorreto(s)!',
			});
		}
	
		return res.status(200).json({
			erro: false,
			mensagem: 'Login efetuado com sucesso!',
			token: token,
		});

	} catch (error) {
		console.log(error);
		return res.status(400).json({
			erro: true,
			mensagem: `Erro: " + ${error}`,
		});
	}};
