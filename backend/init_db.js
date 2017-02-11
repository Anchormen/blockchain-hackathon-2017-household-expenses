const Sequelize = require("sequelize")
const User = require("./user/user_model")
const crypto = require('crypto');
const hash = crypto.createHash('sha256');


User.sync({force: true}).then(
  function () {
    hash.update('anchormen');
    return User.create({
      userName: "john",
      password: hash.digest('base64'),
      firstName: 'John',
      lastName: 'Hancock',
      publicKey: 'PUBLIC',
      privateKey: 'PRIVATE'
    });
  }
)

User.findAll().then(function (users) {
  users.forEach( (user) => {
    console.log(user);
  })
});
