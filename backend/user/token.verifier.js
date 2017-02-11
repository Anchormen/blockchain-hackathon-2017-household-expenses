var jwtSecretKey = require('../config/config');
var jwtHandler = require('jsonwebtoken');
var express = require('express');
let router = express.Router();

router.use(function (req, res, next){
	var token = req.body.token;

	if (token){
		jwtHandler.verify(token, jwtSecretKey.secret, function(err, decoded){
			if (err){
 				res.status(401).json({ "login": false, "message": "Invalid token"});
			}else{
				// res.status(200).json({ "login": true});
				req.decoded = decoded;
				next();
			}
		});
	}else{
		return res.status(403).json({"login": false, "message": "No token provided"});
	};
});

module.exports = router