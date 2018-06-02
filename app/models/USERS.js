/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('USERS', {
		ID: {
			type: DataTypes.STRING(255),
			allowNull: false,
			primaryKey: true
		},
		TOKEN: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		EMAIL: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		NAME: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		LOGIN_TYPE: {
			type: DataTypes.STRING(20),
			allowNull: true
		}
	}, {
		tableName: 'USERS',
		timestamps: false
	});
};
