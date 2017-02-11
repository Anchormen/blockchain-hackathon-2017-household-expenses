// importing and initializing Ethereum compatible JavaScript API
var Web3 = require('web3');
var web3 = new Web3();

// set a provider for the webserver to interact with blockchain
// we need to use a local/remote Ethereum node for that (--rpcport: HTTP-RPC server listening port)
web3.setProvider(new web3.providers.HttpProvider('http://localhost:3000'));
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//stores (static) address and abi information for all callable contracts
contractsConfigMap = {
    'test_contract': {
        'abi': [{"constant":false,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"changeBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}],
        'address': '0x62ae5b42df20c6cab22823144b325fd6e4bb5dfe'
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
    getContract: getContract
};