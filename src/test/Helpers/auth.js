const jwt = require('jsonwebtoken');

const { setRolesToUser } = require('../../libs/auth');
const userModel = require('../../models/User');

const user = {
	username: 'admin',
	password: '12345',
	email: 'admin@gmail.com',
	roles: ['admin', 'user'],
};

const createUserAdmin = async () => {
	const [userCreated, isCreated] = await userModel.findOrCreate({
		where: {
			username: user.username,
			email: user.email,
		},
		defaults: {
			username: user.username,
			password: user.password,
			email: user.email,
		},
	});

	if (isCreated) {
		await setRolesToUser(userCreated, user.roles);
	}
};

const getToken = async () => {
	try {
		const userCreated = await userModel.findOne({
			attributes: ['id', 'password'],
			where: {
				username: user.username,
				email: user.email,
			},
		});

		if (
			userCreated !== null &&
			(await userCreated.validPassword(user.password, userCreated.password))
		) {
			const token = jwt.sign(
				{ id: userCreated.dataValues.id.toString().replace('undefined', '') },
				process.env.SECRET,
				{
					expiresIn: 86400, //Expire in a day
				}
			);

			return token;
		}
	} catch (error) {
		return error;
	}
};

module.exports = { createUserAdmin, getToken };
