var contractsHandler = require('./contracts.handler.js');
var getContract = contractsHandler.getContract;

// initializing contract
var name = "balanceBook";
contract = getContract(name);


function addHouseHold(household, n, g, coach){
    contract.addHouseHold(household, n, g, {from: coach}) ;
}

// function removeHouseHold(household, coach){
//     contract.removeHouseHold(household, {from: coach}) ;
// }

function addPayment(household, company, encrypted_change, coach) {
    contract.addPayment(household, company, encrypted_change, true, {from: coach})
}

function togglePayment(household, company, coach) {
    contract.togglePayment(household, company, {from: coach});
}

function getPayment(household, company) {
    res = contract.getPayment.call(household, company);
    payment = {
        'amount': res[0]['c'][0],
        'active': res[1]
    }
    return payment;
}

function getPublicKeys(household) {
    res = contract.getPublicKeys.call(household);
    keys = {
        'n': res[0]['c'][0], 
        'g': res[1]['c'][0]
    }
    return keys
}


module.exports = {
    addHouseHold: addHouseHold,
    //removeHouseHold: removeHouseHold,
    addPayment: addPayment,
    togglePayment: togglePayment,
    getPayment: getPayment,
    getPublicKeys: getPublicKeys
};