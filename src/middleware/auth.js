const jwt = require('jsonwebtoken');

module.exports = {
	eAdmin(req, res, next) {
		const authHeader = req.headers.authorization;
		//console.log(authHeader);
		if (!authHeader) {
			return res.status(400).json({
				erro: true,
				mensagem: 'Token A inválido ou ausente.',
			});
		}

		const [, token] = authHeader.split(' ');
		console.log('Token:' + token);

		if (!token) {
			return res.status(400).json({
				erro: true,
				mensagem: 'Token B inválido ou ausente.',
			});
		}
		try {
			const decode = jwt.verify(token, 'AS3O20A193KS39DJANVN81937G');
			if (!decode)
				return res.status(401).json({
					error: ' erro ',
				});
			req.userId = decode.userId;
		} catch (err) {
			return res.status(400).json({
				erro: true,
				mensagem: 'Token B inválido ou ausente.',
			});
		}
		return next();
	},
};
