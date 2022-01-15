const clientModel = require('../models/Client');
const companyClient = require('../models/CompanyClient');

const getAllClient = async (req, res) => {
	try {
		const clients = await clientModel.findAll({});
		res.status(200).json(clients);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const getAllClientByIDCompany = async (req, res) => {
	try {
		const { idCompany } = req.params;
		const companyClients = await companyClient.findAll({
			attributes: ['idClient'],
			where: {
				idCompany,
			},
		});

		const clients = await clientModel.findAll({
			where: {
				id: companyClients.map((x) => x.idClient),
			},
		});

		res.status(200).json(clients);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const getClientByID = async (req, res) => {
	try {
		const { id } = req.params;
		const client = await clientModel.findOne({
			where: {
				id,
			},
		});
		res.status(200).json(client);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const createClient = async (req, res) => {
	try {
		const { isCompany, shortName, longName, cedulaRNC, email, telephone, cellphone } = req.body;
		await clientModel.create({
			isCompany,
			shortName,
			longName,
			cedulaRNC,
			email,
			telephone,
			cellphone,
		});

		res.status(200).send('Client Created');
	} catch (error) {
		res.status(500).json({ error });
	}
};

const createClientByIDCompany = async (req, res) => {
	try {
		const { idCompany, isCompany, shortName, longName, cedulaRNC, email, telephone, cellphone } =
			req.body;
		const { id } = await clientModel.create({
			isCompany,
			shortName,
			longName,
			cedulaRNC,
			email,
			telephone,
			cellphone,
		});

		await companyClient.create({
			idCompany,
			idClient: id,
		});

		res.status(200).send('Client Created');
	} catch (error) {
		res.status(500).json({ error });
	}
};

const updateClient = async (req, res) => {
	try {
		const { id } = req.params;
		const { isCompany, shortName, longName, cedulaRNC, email, telephone, cellphone } = req.body;

		const [result] = await clientModel.update(
			{
				isCompany,
				shortName,
				longName,
				cedulaRNC,
				email,
				telephone,
				cellphone,
			},
			{
				where: {
					id,
				},
			}
		);

		if (result === 1) {
			res.status(200).send('Client Updated');
		} else {
			res.status(400).send('Client Not Exist');
		}
	} catch (error) {
		res.status(500).json({ error });
	}
};

const deleteClient = async (req, res) => {
	try {
		const { id } = req.params;

		await clientModel.destroy({
			where: {
				id,
			},
		});

		res.status(200).send('Client Deleted');
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports = {
	getAllClient,
	getClientByID,
	createClient,
	updateClient,
	deleteClient,
	getAllClientByIDCompany,
	createClientByIDCompany,
};
