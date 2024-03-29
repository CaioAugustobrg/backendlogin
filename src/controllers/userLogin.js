const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// app.use(express.static(path.join(__dirname, 'public')));

module.exports = async (req, res) => {  
	const {  username, password, email} = req.body;

	try {
		// const hashPassword = await bcrypt.hash(password, 8);
		let token = jwt.sign({ id: 1 }, 'AS3O20A193KS39DJANVN81937G', {
			expiresIn: '7d',
		});	

		let user = await prisma.user.findUnique({
			where: {  
				formLogin: {
					username: username,
					email: email,
					
				}
			},
		});
		let userId = user.id;
		if (!user) {
			console.log(req.body);
			return res.status(404).json({
				erro: true,
				mensagem: 'Erro: Email, usuário ou senha incorreto(s)!',
			});
		}
	
		let passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(404).json({
				erro: true,
				mensagem: 'Erro: Email, usuário ou senha incorreto(s)!',
			});
		}
		res.cookie('signed_token', token, {
			maxAge: 1000,
			domain: '',
			sameSite: true//importante
		});
		res.cookie('user_id', userId, {
			maxAge: 1000,
			domain: '',
			sameSite: true
		});
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
