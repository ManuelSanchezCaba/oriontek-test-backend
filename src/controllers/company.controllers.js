const companyModel = require('../models/Company');

const getAllCompany = async (req, res) => {
	try {
		const companies = await companyModel.findAll({});
		res.status(200).json(companies);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const getCompanyByID = async (req, res) => {
	try {
		const { id } = req.params;
		const company = await companyModel.findOne({
			where: {
				id,
			},
		});
		res.status(200).json(company);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const createCompany = async (req, res) => {
	try {
		const { shortName, longName, rnc, telephone, telephone2, email, address } = req.body;
		await companyModel.create({
			shortName,
			longName,
			rnc,
			telephone,
			telephone2,
			email,
			address,
		});

		res.status(200).send('Company Created');
	} catch (error) {
		res.status(500).json({ error });
	}
};

const updateCompany = async (req, res) => {
	try {
		const { id } = req.params;
		const { shortName, longName, rnc, telephone, telephone2, email, address } = req.body;

		const [result] = await companyModel.update(
			{
				shortName,
				longName,
				rnc,
				telephone,
				telephone2,
				email,
				address,
			},
			{
				where: {
					id,
				},
			}
		);

		if (result === 1) {
			res.status(200).send('Company Updated');
		} else {
			res.status(400).send('Company Not Exist');
		}
	} catch (error) {
		res.status(500).json({ error });
	}
};

const deleteCompany = async (req, res) => {
	try {
		const { id } = req.params;

		await companyModel.destroy({
			where: {
				id,
			},
		});

		res.status(200).send('Company Deleted');
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports = {
	getAllCompany,
	getCompanyByID,
	createCompany,
	updateCompany,
	deleteCompany,
};
