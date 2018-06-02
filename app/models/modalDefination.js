var Sequelize = require('sequelize');
var dbConfig = require("../../config/dbConfig").config;
var sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql',
    define:{
        createdAt:"CREATION_TSTAMP",
        updatedAt:"LAST_MODIFIED_TSTAMP",
    }
});
var DataTypes = Sequelize.DataTypes;

let users = require("./USERS");
let groups = require("./GROUPS");
let groupAssociation = require("./GROUP_ASSOCIATION");

module.exports = {
    USERS:users(sequelize,DataTypes),
    GROUPS:groups(sequelize,DataTypes),
    GROUP_ASSOCIATION:groupAssociation(sequelize,DataTypes)
}