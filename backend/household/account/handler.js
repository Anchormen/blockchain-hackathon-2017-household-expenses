var express = require('express');

class AccountHandler {
  getAccount(req, res) {
    var testAccount = {
      "first_name": "Mohamed",
      "last_name": "ElSioufy",
      "id": req.params['id']
    }
    res.status(200).json(testAccount)
  }
}

module.exports = new AccountHandler()
