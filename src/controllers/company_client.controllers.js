const companyClientModel = require('../models/CompanyClient');

const getAllCompanyClient = async (req, res) => {
	try {
		const companyClients = await companyClientModel.findAll({});
		res.status(200).json(companyClients);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const getCompanyClientByID = async (req, res) => {
	try {
		const { id } = req.params;
		const companyClient = await companyClientModel.findOne({
			where: {
				id,
			},
		});
		res.status(200).json(companyClient);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const createCompanyClient = async (req, res) => {
	try {
		const { idCompany, idClient } = req.body;
		await companyClientModel.create({ idCompany, idClient });

		res.status(200).send('Company Client Created');
	} catch (error) {
		res.status(500).json({ error });
	}
};

const updateCompanyClient = async (req, res) => {
	try {
		const { id } = req.params;
		const { idCompany, idClient } = req.body;

		const [result] = await companyClientModel.update(
			{ idCompany, idClient },
			{
				where: {
					id,
				},
			}
		);

		if (result === 1) {
			res.status(200).send('Company Client Updated');
		} else {
			res.status(400).send('Company Client Not Exist');
		}
	} catch (error) {
		res.status(500).json({ error });
	}
};

const deleteCompanyClient = async (req, res) => {
	try {
		const { id } = req.params;

		await companyClientModel.destroy({
			where: {
				id,
			},
		});

		res.status(200).send('Company Client Deleted');
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports = {
	getAllCompanyClient,
	getCompanyClientByID,
	createCompanyClient,
	updateCompanyClient,
	deleteCompanyClient,
};
