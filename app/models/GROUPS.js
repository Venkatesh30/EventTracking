/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('GROUPS', {
		ID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		NAME: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		TYPE: {
			type: DataTypes.ENUM('INDIVIDUAL','TEAM'),
			allowNull: true,
			defaultValue: 'INDIVIDUAL'
		}
	}, {
		tableName: 'GROUPS',
		timestamps: false
	});
};
