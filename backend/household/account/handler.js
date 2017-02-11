var express = require('express');

class AccountHandler {
  getAccount(req, res) {
    res.statusCode = 200
    var testAccount = {
      "first_name": "Mohamed",
      "last_name": "ElSioufy",
      "id": req.params['id']
    }
    res.end(JSON.stringify(testAccount))
  }
}

module.exports = new AccountHandler()
