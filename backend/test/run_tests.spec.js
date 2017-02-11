
var mainRef = require("../server.js");
var TestContract = require('../blockchainwrapper/contract.BalanceBook.handler.js');
var contractsHandler = require('../blockchainwrapper/contracts.handler.js');
web3 = contractsHandler.web3

describe("BlockChainWrapperTests", function(){
    describe("TestContractUserBalanceIs20", function() {
    	household = 23;
    	coach_address = web3.eth.accounts[0];
    	n = 1;
    	g = 2;
    	company = 'FU';
    	encrypted_change = 20;
        it("adds a payment correctly.", function(done) {
        	web3.personal.unlockAccount(coach_address, 'MYPASSPHRASE');
            TestContract.addHouseHold(household, n, g, coach_address);
            TestContract.addPayment(household, company, encrypted_change, coach_address);
            setTimeout(()=>{
            	payment = TestContract.getPayment(household, company);
            	expect(payment['amount']).toBe(encrypted_change);
            	expect(payment['active']).toBe(true);
            	done();
            }, 1000);
        });
    });
});

mainRef.closeServer()

