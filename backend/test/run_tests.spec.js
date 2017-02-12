var mainRef = require("../server.js");
var TestContract = require('../blockchainwrapper/contract.BalanceBook.handler.js');
var contractsHandler = require('../blockchainwrapper/contracts.handler.js');
web3 = contractsHandler.web3

describe("BlockChainWrapperTests", function(){
    describe("Test smart contract balance book", function() {
    	let household = 23;
    	let coach_address = web3.eth.accounts[0];
    	let n = 1;
    	let g = 2;
    	let company = 'AB';
    	let encrypted_change = 20;

    	web3.personal.unlockAccount(coach_address,'pass')

	    it("should add a payment correctly.", function(done) {
	    	console.log('add payment');
	        TestContract.addHouseHold(household, n, g, coach_address);
	        TestContract.addPayment(household, company, encrypted_change, coach_address);
	        waits(500);
	        runs(function() {
	        	console.log('get payment');
	        	payment = TestContract.getPayment(household, company);
	        	expect(payment['amount']).toBe(encrypted_change);
	        	expect(payment['active']).toBe(true);
	        	done();
	        });
	    });
		
		it('should get public keys correctly.', function(done) {
			waits(1000);
			runs(function() {
	    		console.log('get public keys');
	    		keys = TestContract.getPublicKeys(household);
	    		expect(keys['n']).toBe(n);
	    		expect(keys['g']).toBe(g);
	    		done();
	    	});
	    });
		
		it('should toggle the activity of a payment.', function(done) {
			console.log('toggle');

			waits(4000);
			TestContract.togglePayment(household, company, coach_address);

			runs(function() {
				console.log('toggle - get');
	        	payment = TestContract.getPayment(household, company);
	        	expect(payment['amount']).toBe(encrypted_change);
	        	expect(payment['active']).toBe(false);
	        	done();
	    	});
		});

    	// it("should remove a household correctly.", function(done) {
    	// 	console.log('remove household')
    	// 	//TestContract.addPayment(household, company, encrypted_change, coach_address);
    	// 	waits(2000);
    	// 	runs(function() {
     //    		TestContract.removeHouseHold(household);
     //    		waits(500);
     //    		runs(function(){
     //    			console.log('remove house - get');
     //    			payment = TestContract.getPayment(household, company);
					// expect(payment['amount']).toBe(0);
     //        		expect(payment['active']).toBe(false);
     //        		done();
     //        	})
     //        });
    	// });
    });
});

mainRef.closeServer();