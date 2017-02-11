To query a contract using web3 use:

```var solc = require('solc');

var address = ADDRESS
var output = solc.compile(solidity_contract_code, 1);
var abi = JSON.parse(output.contracts[solidity_contract_name].interface);
var balancebookContract = web3.eth.contract(abi);
```

And then, for example to get the balance of a household

```
balancebookContract.at(address).getBalance.call()
```