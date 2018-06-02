/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('EVENTS', {
		ID: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		USER_ID: {
			type: DataTypes.STRING(255),
			allowNull: false,
			references: {
				model: 'USERS',
				key: 'ID'
			}
		},
		TITLE: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		DESCRIPTION: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		STATUS: {
			type: DataTypes.ENUM('DRAFT','ACTIVE','DONE','DELETED'),
			allowNull: true,
			defaultValue: 'ACTIVE'
		},
		SCHEDULED_TIME: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		CREATION_TSTAMP: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		LAST_MODIFIED_TSTAMP: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: '0000-00-00 00:00:00'
		}
	}, {
		tableName: 'EVENTS',
		timestamps: false
	});
};
