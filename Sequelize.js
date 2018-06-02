var Sequelize = require("sequelize");
var dbConfig = require("./config/dbConfig").config;
var Connection = require("./dbConnection");

var sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql',
    define:{
        createdAt:"CREATION_TSTAMP",
        updatedAt:"LAST_MODIFIED_TSTAMP",
    }
});

sequelize.connectionManager.connect = function(){
    return new Promise(function(resolve,reject){
        Connection.create(function(connection){
            if(connection){
                resolve(connection)
            }
            else{
            reject("eroor");
            }
        });
    });
}

sequelize.connectionManager.disconnect = function(connection){
  if (!connection._protocol._ended) {
       connection.release()
  }
  return Promise.resolve();

}

module.exports = {
    sequelize:sequelize,
    DataTypes:Sequelize.DataTypes
};