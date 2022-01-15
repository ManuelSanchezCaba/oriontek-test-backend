const { Sequelize } = require('sequelize');

const { DB_NAME, DB_NAME_TEST, DB_USER, DB_PASS, DB_HOST, NODE_ENV } = process.env;

const db_name = NODE_ENV === 'test' ? DB_NAME_TEST : DB_NAME;

const sequelize = new Sequelize(db_name, DB_USER, DB_PASS, {
	host: DB_HOST,
	dialect: 'mysql',
});

(async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();

module.exports = sequelize;
