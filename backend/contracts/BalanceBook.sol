pragma solidity ^0.4.4;

contract BalanceBook{
	mapping (uint => address) private coaches;
	mapping (uint => int) private balances;
	address public owner;

	function BalanceBook() {
	    owner = msg.sender;
	}

	modifier onlyCoach(uint household) {
		if (msg.sender == coaches[household]) {
			_;
		}
	}

	function addHouseHold(uint household) {
		coaches[household] = msg.sender;
		balances[household] = 0;
	}

	function removeHouseHold(uint household) onlyCoach(household) {
		delete coaches[household];
		delete balances[household];
	}

	function modifyBalance(uint household, int amount) onlyCoach(household) {
		balances[household] += amount;
	}

	function getBalance(uint household) onlyCoach(household) returns(int) {
		return balances[household];
	}
}