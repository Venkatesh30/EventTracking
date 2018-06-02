/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('facebook', {
		id: {
			type: DataTypes.STRING(255),
			allowNull: false,
			primaryKey: true
		},
		token: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'facebook',
		timestamps: false
	});
};
