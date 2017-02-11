const Sequelize = require("sequelize")
const User = require("./user/model")

//
// User.sync({force: true}).then(function () {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });

User.findAll({
  where: {
    firstName: "John"
  }
}).then(function (user) {
    console.log(user[0].get('firstName'));
});
