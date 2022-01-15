const roleModel = require('../models/Role');

const createRoles = async () => {
	try {
		const count = await roleModel.count();

		if (count > 0) {
			return;
		}

		const values = await Promise.all([
			roleModel.create({ descr: 'admin' }),
			roleModel.create({ descr: 'user' }),
		]);

		console.log(values);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	createRoles,
};
