const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req,res) => {
	try {
		const getAccounts = await prisma.account.findMany({
			select: {accountId: true}
		});
		
		if (getAccounts == null) {
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
};
	
