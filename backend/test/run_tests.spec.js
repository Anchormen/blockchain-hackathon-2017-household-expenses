
var mainRef = require("../server.js");
var TestContract = require('../blockchainwrapper/contract.test.handler');

describe("BlockChainWrapperTests", function(){
    describe("TestContractUserBalanceIs20", function() {
        it("returns balance of 20", function(done) {
            bal = TestContract.getBalance();
            expect(bal).toBe(20);
            done()
        });
    });
});

mainRef.closeServer()

