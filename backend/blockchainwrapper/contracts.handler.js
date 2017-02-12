// importing and initializing Ethereum compatible JavaScript API
var Web3 = require('web3');
var web3 = new Web3();

// set a provider for the webserver to interact with blockchain
// we need to use a local/remote Ethereum node for that (--rpcport: HTTP-RPC server listening port)
web3.setProvider(new web3.providers.HttpProvider('http://localhost:3000'));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//stores (static) address and abi information for all callable contracts
contractsConfigMap = {
    'balanceBook': {
        'abi': [{"constant":false,"inputs":[{"name":"household","type":"uint256"},{"name":"company","type":"string"},{"name":"encrypted_change","type":"int256"},{"name":"active","type":"bool"}],"name":"addPayment","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"household","type":"uint256"}],"name":"getPublicKeys","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"household","type":"uint256"},{"name":"company","type":"string"}],"name":"togglePayment","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"public_ns","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"household","type":"uint256"},{"name":"company","type":"string"}],"name":"getPayment","outputs":[{"name":"","type":"int256"},{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"public_gs","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"household","type":"uint256"}],"name":"removeHouseHold","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"household","type":"uint256"},{"name":"n","type":"uint256"},{"name":"g","type":"uint256"}],"name":"addHouseHold","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}],
        'address': '0x6a33beece33b1bc3c83f526f9965a3838b709dda'
    }
};

initializedContracts = {}; // stores runtime information for initialized contracts

function getContract(name) {
    if (! (name in initializedContracts)){
        console.log("first request to " + name + ", initializing contract");
        contractConfig = contractsConfigMap[name];
        contractABI = contractConfig['abi'];
        contractAddress = contractConfig['address'];
        initializedContracts[name] = web3.eth.contract(contractABI).at(contractAddress);
        return initializedContracts[name];
    }
    return initializedContracts[name];
}

module.exports = {
    getContract: getContract,
    web3: web3
};