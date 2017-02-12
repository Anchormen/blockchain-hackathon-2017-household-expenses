const balanceContractHandler = require('../blockchainwrapper/contract.BalanceBook.handler')
const contractsHandler = require('../blockchainwrapper/contracts.handler.js');
const web3 = contractsHandler.web3

function sendTransaction(req, res){
	let creditorAddress = req.body.creditorAddress;
	let creditorName = req.body.creditorName;
	let amount = req.body.amount;
	let householdId = req.body.householdId;

	let coachAddress = web3.eth.accounts[0];
	web3.personal.unlockAccount(coachAddress,'lautaro')

	console.log("Adding payment");
	balanceContractHandler.addPayment(householdId, creditorName, amount, coachAddress);

}

module.exports = sendTransaction
