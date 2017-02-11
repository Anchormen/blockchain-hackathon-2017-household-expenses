var contractDefinitions = require('./contracts.handler.js');

var name = "test_contract";
contract = contractDefinitions(name);

function getBalance(){
    return contract.getBalance.call();
}


module.exports = getBalance;