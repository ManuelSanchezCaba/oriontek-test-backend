const roleModel = require('../models/Role');
const userRolesModel = require('../models/UserRoles');

const getRoles = async (roles) => {
	if (roles) {
		const foundRoles = await roleModel.findAll({
			where: {
				descr: roles,
			},
		});

		return foundRoles.map((role) => role.id);
	} else {
		const role = await roleModel.findOne({
			where: {
				descr: 'user',
			},
		});

		return [role.id];
	}
};

const setRolesToUser = async (user, roles) => {
	try {
		let roleIds = await getRoles(roles);

		console.log(user);

		roleIds.map(async (roleId) => await userRolesModel.create({ idUser: user.id, idRole: roleId }));
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	setRolesToUser,
};
