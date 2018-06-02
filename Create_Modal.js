var SequelizeAuto = require('sequelize-auto')
var dbConfig = require("./config/dbConfig").config;

var auto = new SequelizeAuto(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql',
    tables: ['USERS'],
    directory:'./app/models',
    additional: {
        timestamps: false
    },
});
auto.run(function (err) {
  if (err) throw err;

  console.log(auto.tables); // table list
  console.log(auto.foreignKeys); // foreign key list
});