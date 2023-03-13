const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
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

};
