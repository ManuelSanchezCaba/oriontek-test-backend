const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Representative = sequelize.define(
	'representatives',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			primaryKey: true,
		},
		idClient: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		telephone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		telephone2: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		cellphone: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
);

module.exports = Representative;
