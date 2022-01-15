const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Client = sequelize.define(
	'clients',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			primaryKey: true,
			autoIncrement: true,
		},
		isCompany: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		shortName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		longName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		cedulaRNC: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		telephone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		cellphone: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		timestamps: false,
	}
);

module.exports = Client;
