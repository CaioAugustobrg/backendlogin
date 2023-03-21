const jwt = require('jsonwebtoken');

module.exports = {
	eAdmin(req, res, next) {
		const { signed_token } = req.cookies;
		if (!signed_token) {
			return res.status(400).json({
				erro: true,
				mensagem: 'Token A inválido ou ausente.',
			});
		}
		try {
			const decode = jwt.verify(signed_token, process.env.SECRET_PASS);
			if (!decode)
				return res.status(401).json({
					error: ' erro ',
				});
			req.userId = decode.userId;
			return next();
		} catch (err) {
			return res.status(400).json({
				erro: true,
				mensagem: 'Token A inválido ou ausente.',
			});
			
		}
		
	},

};
