// importing and initializing Ethereum compatible JavaScript API
var Web3 = require('web3');
var web3 = new Web3();

// set a provider for the webserver to interact with blockchain
// we need to use a local/remote Ethereum node for that (--rpcport: HTTP-RPC server listening port)
web3.setProvider(new web3.providers.HttpProvider('http://localhost:3000')); // todo; configurable env var
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//stores (static) address and abi information for all callable contracts
var contractsConfigMap = {
    'test_contract': {
        'abi': [{"constant":false,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"changeBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}],
        'address': '0x62ae5b42df20c6cab22823144b325fd6e4bb5dfe'
    }
    //todo; one entry per contract (could be changed to a config file ..)
};

// stores runtime information for initialized contracts
var initializedContracts = {};


function getContract(name) {

    if (! (name in initializedContracts)){
        console.log("first request to " + name + ", initializing contract");
        var contract = web3.eth.contract(contractsConfigMap[name]['abi']).at(contractsConfigMap['address']);
        initializedContracts[name] = contract;
    }
    return initializedContracts[name];
}

module.exports = getContract;