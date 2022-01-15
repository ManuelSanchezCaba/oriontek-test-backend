const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const CompanyClient = sequelize.define(
	'company_clients',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			primaryKey: true,
		},
		idCompany: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		idClient: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
);

module.exports = CompanyClient;
