/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('GROUP_ASSOCIATION', {
		ID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		GROUP_ID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'GROUPS',
				key: 'ID'
			}
		},
		USER_ID: {
			type: DataTypes.STRING(255),
			allowNull: true,
			references: {
				model: 'USERS',
				key: 'ID'
			}
		}
	}, {
		tableName: 'GROUP_ASSOCIATION',
		timestamps: false
	});
};
