const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Address = sequelize.define(
	'addresses',
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
		country: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		municipality: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		street: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		streetNo: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		postalCode: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
);

module.exports = Address;
