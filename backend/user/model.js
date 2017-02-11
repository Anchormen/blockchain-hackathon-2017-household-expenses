const Sequelize = require("sequelize")
const db = require("../db/sequelize.js")

let User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name'
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = User
