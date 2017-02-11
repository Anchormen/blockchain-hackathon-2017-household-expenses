var contractsHandler = require('./contracts.handler.js');
var getContract = contractsHandler.getContract;

// initializing contract
var name = "balanceBook";
contract = getContract(name);


function addHouseHold(household, n, g, coach){
    contract.addHouseHold(household, n, g, {from: coach}) ;
}

function removeHouseHold(household, coach){
    contract.removeHouseHold(household, {from: coach}) ;
}

function addPayment(household, company, encrypted_change, active, coach) {
    contract.addPayment(household, company, encrypted_change, active, {from: coach})
}

function togglePayment(household, company, coach) {
    contract.togglePayment(household, company, {from: coach});
}

function getPayment(household, company) {
    
    res = contract.getPayments.call(household, company);
    payment = res[0]['c'][0];
    active = res[1];
    return [payment, active];
}

function getPublicKeys(household) {
    return contract.getPublicKeys.call(household) ;
}


module.exports = {
    addHouseHold: addHouseHold,
    removeHouseHold: removeHouseHold,
    addPayment: addPayment,
    togglePayment: togglePayment,
    getPayment: getPayment,
    getPublicKeys: getPublicKeys
};