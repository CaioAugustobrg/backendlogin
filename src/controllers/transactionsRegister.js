const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
	const {debitedAccountId} = req.params;
	const {balance, creditedAccountId} = req.body;
	try {

		let getDebitedCurrentlyBalance = await prisma.account.findUnique({
			where: {accountId:debitedAccountId},
			select: {balance: true}
		});

		let getCreditedCurrentBalance = await prisma.account.findUnique({
			where: {accountId: creditedAccountId },
			select: {balance: true}
		});

		if (getDebitedCurrentlyBalance.balance < balance) {
			return res.status(400).json({
				erro: true,
				msg: 'Your money is not enough for this transaction'
			});
		}

		let debitedLeftOverTrade = getDebitedCurrentlyBalance.balance - balance;
		parseInt(debitedLeftOverTrade);

		let updateDebitedBalanceById = await prisma.account.update({
			where: {accountId:  debitedAccountId},
			data: { balance: debitedLeftOverTrade }
		});

		let creditedLeftOverTrade = await getCreditedCurrentBalance.balance + balance;
		parseInt(creditedLeftOverTrade);

		let updateCreditedBalanceById = await prisma.account.update({
			where: {accountId: creditedAccountId},
			data: {balance: creditedLeftOverTrade}
		});

		const registerTransactionsOnTransactionsTable  = async () => {
			let registerTransactions = await prisma.transactions.create({
				data: {creditedAccountId: creditedAccountId, debitedAccountId: debitedAccountId, value: balance}
			});	
			res.send(registerTransactions);
		};

		if (updateDebitedBalanceById && updateCreditedBalanceById) {
			registerTransactionsOnTransactionsTable();	
		}
		
	} catch (error) {
		return res.status(400).json({
			erro: true,
			msg: 'erro: ' + error,
		
		});
	}
};
