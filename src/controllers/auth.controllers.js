const userModel = require('../models/User');
const { setRolesToUser } = require('../libs/auth');
const jwt = require('jsonwebtoken');
const Op = require('Sequelize').Op;

const signin = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const user = await userModel.findOne({
			where: {
				[Op.or]: { username, email },
			},
		});

		if (user === null) {
			return res.json({ message: 'User Not Exist' });
		}

		if (await user.validPassword(password, user.password)) {
			const token = jwt.sign({ id: user.id }, process.env.SECRET, {
				expiresIn: 86400, //Expire in a day
			});

			return res.json({ token });
		}

		res.json({ message: 'Incorrect Password' });
	} catch (error) {
		res.status(500).json(error);
	}
};

const signup = async (req, res) => {
	try {
		const { username, password, email, roles } = req.body;

		const [user, isCreated] = await userModel.findOrCreate({
			where: {
				username,
				email,
			},
			defaults: {
				username,
				password,
				email,
			},
		});

		if (!isCreated) {
			return res.json({ message: 'User Already Created' });
		}

		setRolesToUser(user, roles);

		const token = jwt.sign({ id: user.id }, process.env.SECRET, {
			expiresIn: 86400, //Expire in a day
		});

		res.json({ message: 'User Created', token });
	} catch (error) {
		res.status(500).json(error);
	}
};

module.exports = {
	signin,
	signup,
};
