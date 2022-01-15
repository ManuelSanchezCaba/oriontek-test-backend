const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Company = sequelize.define(
	'companies',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			primaryKey: true,
		},
		shortName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		longName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		rnc: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		telephone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		telephone2: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
);

module.exports = Company;
