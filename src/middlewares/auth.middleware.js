const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
const userRoleModel = require('../models/UserRoles');
const roleModel = require('../models/Role');

const verifyToken = async (req, res, next) => {
	try {
		const token = req.headers['x-access-token'];

		if (!token) return res.status(403).json({ message: 'No Token Provided' });

		const decode = jwt.verify(token, process.env.SECRET);

		req.userId = decode.id;

		const user = await userModel.findOne({
			attributes: ['id', 'username', 'email'],
			where: {
				id: req.userId,
			},
		});

		if (!user) return res.status(404).json({ message: 'User Not Found' });

		next();
	} catch (error) {
		res.status(401).json({ message: 'Unauthorized', error });
	}
};

const isAdmin = async (req, res, next) => {
	try {
		const userRoles = await userRoleModel.findAll({
			where: {
				idUser: req.userId,
			},
		});

		const role = await roleModel.findOne({
			where: {
				descr: 'admin',
			},
		});

		if (userRoles.filter((x) => x.idRole === role.id).length > 0) {
			return next();
		} else {
			return res.status(403).json({ message: 'Do not have permission' });
		}
	} catch (error) {
		res.status(500).json({ error });
	}
};

const isUser = async (req, res, next) => {
	try {
		const userRoles = await userRoleModel.findAll({
			where: {
				idUser: req.userId,
			},
		});

		const role = await roleModel.findOne({
			where: {
				descr: 'user',
			},
		});

		if (userRoles.filter((x) => x.idRole === role.id).length > 0) {
			return next();
		} else {
			return res.status(403).json({ message: 'Do not have permission' });
		}
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports = {
	verifyToken,
	isAdmin,
	isUser,
};
