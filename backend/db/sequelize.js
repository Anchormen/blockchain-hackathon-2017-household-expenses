var Sequelize = require("sequelize")

let sequelize = new Sequelize('dbh2017', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  storage: '/tmp/dbh2017.sqlite'
});

module.exports = sequelize
