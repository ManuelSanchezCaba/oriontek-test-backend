const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const userModel = require('./User');
const roleModel = require('./Role');

const UserRole = sequelize.define(
	'user_roles',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: true,
		},
		idUser: {
			type: DataTypes.INTEGER,
		},
		idRole: {
			type: DataTypes.INTEGER,
		},
	},
	{
		timestamps: false,
	}
);

UserRole.hasMany(userModel, { foreignKey: 'id', sourceKey: 'idUser' });
UserRole.hasMany(roleModel, { foreignKey: 'id', sourceKey: 'idRole' });
userModel.hasMany(UserRole, { foreignKey: 'idUser', sourceKey: 'id' });
roleModel.hasMany(UserRole, { foreignKey: 'idRole', sourceKey: 'id' });

module.exports = UserRole;
