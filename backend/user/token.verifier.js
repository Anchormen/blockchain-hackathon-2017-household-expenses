var jwtSecretKey = require('../config/config');
var jwtHandler = require('jsonwebtoken');
var express = require('express');
let router = express.Router();

router.use(function (req, res, next){
	     // console.log(req.headers);
       var token = req.headers["authorization"].replace('Bearer ', '');
       console.log("Verifying token");
       console.log(token);
        if (token){
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
	} else {
		return res.status(403).json({"login": false, "message": "No token provided"});
	};
});

module.exports = router
