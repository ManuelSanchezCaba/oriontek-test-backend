const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const bcrypt = require('bcrypt');

const User = sequelize.define(
	'users',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true,
			},
		},
	},
	{
		timestamps: false,
		hooks: {
			beforeCreate: async (user) => {
				if (user.password) {
					const salt = await bcrypt.genSalt(10);
					user.password = await bcrypt.hash(user.password, salt);
				}
			},
			beforeUpdate: async (user) => {
				if (user.password) {
					const salt = await bcrypt.genSalt(10);
					user.password = await bcrypt.hash(user.password, salt);
				}
			},
		},
		instanceMethods: {
			validPassword: async (password) => {
				return await bcrypt.compare(password, this.password);
			},
		},
	}
);

User.prototype.validPassword = async (password, hash) => {
	return await bcrypt.compare(password, hash);
};

module.exports = User;
