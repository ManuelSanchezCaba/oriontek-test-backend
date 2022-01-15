const representativeModel = require('../models/Representative');

const getAllRepresentative = async (req, res) => {
	try {
		const representatives = await representativeModel.findAll({});
		res.status(200).json(representatives);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const getAllRepresentativesByIDClient = async (req, res) => {
	try {
		const { idClient } = req.params;
		const representatives = await representativeModel.findAll({
			where: {
				idClient,
			},
		});
		res.status(200).json(representatives);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const getRepresentativeByID = async (req, res) => {
	try {
		const { id } = req.params;
		const representatives = await representativeModel.findOne({
			where: {
				id,
			},
		});
		res.status(200).json(representatives);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const createRepresentative = async (req, res) => {
	try {
		const { idClient, name, telephone, telephone2, cellphone, email } = req.body;
		await representativeModel.create({ idClient, name, telephone, telephone2, cellphone, email });

		res.status(200).send('Representative Created');
	} catch (error) {
		res.status(500).json({ error });
	}
};

const updateRepresentative = async (req, res) => {
	try {
		const { id } = req.params;
		const { idClient, name, telephone, telephone2, cellphone, email } = req.body;

		const [result] = await representativeModel.update(
			{ idClient, name, telephone, telephone2, cellphone, email },
			{
				where: {
					id,
				},
			}
		);

		if (result === 1) {
			res.status(200).send('Representative Updated');
		} else {
			res.status(400).send('Representative Not Exist');
		}
	} catch (error) {
		res.status(500).json({ error });
	}
};

const deleteRepresentative = async (req, res) => {
	try {
		const { id } = req.params;

		await representativeModel.destroy({
			where: {
				id,
			},
		});

		res.status(200).send('Representative Deleted');
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports = {
	getAllRepresentative,
	getRepresentativeByID,
	createRepresentative,
	updateRepresentative,
	deleteRepresentative,
	getAllRepresentativesByIDClient,
};
