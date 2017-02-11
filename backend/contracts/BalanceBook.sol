pragma solidity ^0.4.4;

contract BalanceBook{
	struct Payment{
		int encrypted_change;
		bool active;
	}

	mapping (uint => address) coaches;
	mapping (uint => mapping (string => Payment)) private payments;
	mapping (uint => uint) public public_ns;
	mapping (uint => uint) public public_gs;
	address public owner;

	function BalanceBook() {
	    owner = msg.sender;
	}

	modifier onlyCoach(uint household) {
		if (msg.sender == coaches[household]) {
			_;
		}
	}

	function addHouseHold(uint household, uint n, uint g) {
		coaches[household] = msg.sender;
		public_ns[household] = n * n;
		public_gs[household] = g;
	}

	function removeHouseHold(uint household) onlyCoach(household) {
		delete coaches[household];
		delete public_ns[household];
		delete public_gs[household];
	}

	function addPayment(uint household, string company, int encrypted_change, bool active) onlyCoach(household) {
		Payment memory payment = Payment(encrypted_change, active);
		payments[household][company] = payment;
	}

	function togglePayment(uint household, string company) onlyCoach(household) {
		payments[household][company].active = !payments[household][company].active;
	}

	function getPayment(uint household, string company) returns (int, bool) {
	    Payment payment = payments[household][company];
	    return (payment.encrypted_change, payment.active);
	} 

	function getPublicKeys(uint household) returns (uint, uint) {
		return (public_ns[household], public_gs[household]);
	}
}pragma solidity ^0.4.4;

contract BalanceBook{
	struct Payment{
		int encrypted_change;
		bool active;
	}

	mapping (uint => address) coaches;
	mapping (uint => mapping (string => Payment)) private payments;
	mapping (uint => uint) public public_ns;
	mapping (uint => uint) public public_gs;
	address public owner;

	function BalanceBook() {
	    owner = msg.sender;
	}

	modifier onlyCoach(uint household) {
		if (msg.sender == coaches[household]) {
			_;
		}
	}

	function addHouseHold(uint household, uint n, uint g) {
		coaches[household] = msg.sender;
		public_ns[household] = n * n;
		public_gs[household] = g;
	}

	function removeHouseHold(uint household) onlyCoach(household) {
		delete coaches[household];
		delete public_ns[household];
		delete public_gs[household];
	}

	function addPayment(uint household, string company, int encrypted_change, bool active) onlyCoach(household) {
		Payment memory payment = Payment(encrypted_change, active);
		payments[household][company] = payment;
	}

	function togglePayment(uint household, string company) onlyCoach(household) {
		payments[household][company].active = !payments[household][company].active;
	}

	function getPayment(uint household, string company) returns (int, bool) {
	    Payment payment = payments[household][company];
	    return (payment.encrypted_change, payment.active);
	} 

	function getPublicKeys(uint household) returns (uint, uint) {
		return (public_ns[household], public_gs[household]);
	}
}