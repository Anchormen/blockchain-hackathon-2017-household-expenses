var contractsHandler = require('./contracts.handler.js');
var getContract = contractsHandler.getContract;

// initializing contract
var name = "test_contract";
contract = getContract(name);

function getBalance(){
    return contract.getBalance.call();
}

module.exports = getBalance;