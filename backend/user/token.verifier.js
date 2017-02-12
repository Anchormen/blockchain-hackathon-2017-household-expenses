var jwtSecretKey = require('../config/config');
var jwtHandler = require('jsonwebtoken');
var express = require('express');
let router = express.Router();

router.use(function (req, res, next){

       console.log("Verifying token");

       let authorizationHeader = req.headers["authorization"];
       console.log(authorizationHeader);

        if (authorizationHeader){
        	console.log("I found an authorization header");

        	let token = authorizationHeader.replace('Bearer ', '');

        	if (token){
        		console.log("I fount a token");

	            jwtHandler.verify(token, jwtSecretKey.secret, function(err, decoded){
	              if (err){
	               console.log("Authorization NOK");
	                res.status(401).json({ "login": false, "message": "Invalid token"});
	              } else {
		              // res.status(200).json({ "login": true});
		             console.log("Authorization OK");
		              req.decoded = decoded;
		              next();
								}
						});
	    }else{
	    	console.log("I could not find a token");
			return res.status(403).json({"login": false, "message": "No token provided"});
	    }
	} else {
		console.log("I could not find an authorization header");
		return res.status(403).json({"login": false, "message": "No token provided"});
	};
});

module.exports = router
