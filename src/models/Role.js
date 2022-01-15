const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Role = sequelize.define(
	'roles',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		descr: {
			type: DataTypes.STRING,
		},
	},
	{
		timestamps: false,
	}
);

module.exports = Role;
