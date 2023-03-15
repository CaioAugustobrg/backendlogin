const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
	const {debitedAccountId} = req.params;
	const {balance, creditedAccountId} = req.body;
	try {

		let getCurrentlyBalance = await prisma.account.findUnique({
			where: {accountId:debitedAccountId},
			select: {balance: true}
		});

		if (getCurrentlyBalance > balance) {
			return res.status(400).json({
				erro: true,
				msg: 'Your money is not enough for this transaction'
			});
		}

		let leftOverTrade = getCurrentlyBalance - balance;

		let updateBalanceById = await prisma.account.update({
			where: {accountId:  debitedAccountId},
			data: { balance: leftOverTrade }
		});



		console.log(updateBalanceById);

		const registerTransactionsOnTransactionsTable  = async () => {
			let registerTransactions = await prisma.transactions.create({
				data: {creditedAccountId: creditedAccountId, debitedAccountId: debitedAccountId, value: balance}
			});	
			res.send(registerTransactions);
		};

		if (updateBalanceById) {
			registerTransactionsOnTransactionsTable();	
		}
		
	} catch (error) {
		return res.status(400).json({
			erro: true,
			msg: 'erro: ' + error,
		
		});
	}
};
