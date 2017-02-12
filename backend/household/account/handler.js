const balanceContractHandler = require('../../blockchainwrapper/contract.BalanceBook.handler')
const contractsHandler = require('../../blockchainwrapper/contracts.handler.js');
const web3 = contractsHandler.web3

function getPayment(req, res){
	let companies = req.body.companies;
	let householdId = req.body.householdId;

	let payments = [];

	console.log(companies);
	console.log(householdId);

	companies.forEach(function(comp){
		console.log("Getting payment for company"+comp.creditor);
		let payment = balanceContractHandler.getPayment(householdId, comp.creditor);
		payments.push({'company': comp.creditor, 'payment': payment});
	});

	console.log("I ended");
	res.json(payments);
	res.end();
}

// class AccountHandler {
//   getAccount(req, res) {
//     var testAccount = {
//       "first_name": "Mohamed",
//       "last_name": "ElSioufy",
//       "id": req.params['id']
//     }
//     res.status(200).json(testAccount)
//   }
// }

module.exports = getPayment
