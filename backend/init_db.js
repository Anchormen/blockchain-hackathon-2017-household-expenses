const Sequelize = require("sequelize")
const User = require("./user/model")
const crypto = require('crypto');
const hash = crypto.createHash('sha256');

hash.update('anchormen');

User.sync({force: true}).then(
  function () {
    return User.create({
      userName: "john",
      password: hash.digest('base64'),
      firstName: 'John',
      lastName: 'Hancuock'
    });
  }
)

User.findAll().then(function (users) {
  users.forEach( (user) => {
    console.log(user);
  })
});
