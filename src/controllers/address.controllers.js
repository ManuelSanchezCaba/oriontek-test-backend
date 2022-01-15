const { Op } = require('sequelize');
const addressModel = require('../models/Address');

const getAllAddress = async (req, res) => {
	try {
		const addresses = await addressModel.findAll({});
		res.status(200).json(addresses);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const getAllAddressByIDClient = async (req, res) => {
	try {
		const { idClient } = req.params;
		const addresses = await addressModel.findAll({
			where: {
				idClient,
			},
		});
		res.status(200).json(addresses);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const getAddressByID = async (req, res) => {
	try {
		const { id } = req.params;
		const address = await addressModel.findOne({
			where: {
				id,
			},
		});
		res.status(200).json(address);
	} catch (error) {
		res.status(500).json({ error });
	}
};

const createAddress = async (req, res) => {
	try {
		const { idClient, country, city, municipality, street, streetNo, postalCode, status } =
			req.body;

		const lastAddress = await addressModel.findOne({
			where: {
				[Op.and]: [{ idClient: idClient }, { status: true }],
			},
		});

		if (lastAddress) {
			await addressModel.update(
				{ status: false },
				{
					where: {
						id: lastAddress.id,
					},
				}
			);
		}

		await addressModel.create({
			idClient,
			country,
			city,
			municipality,
			street,
			streetNo,
			postalCode,
			status,
		});

		res.status(200).send('Address Created');
	} catch (error) {
		res.status(500).json({ error });
	}
};

const updateAddress = async (req, res) => {
	try {
		const { id } = req.params;
		const { idClient, country, city, municipality, street, streetNo, postalCode, status } =
			req.body;

		const [result] = await addressModel.update(
			{ idClient, country, city, municipality, street, streetNo, postalCode, status },
			{
				where: {
					id,
				},
			}
		);

		if (result === 1) {
			res.status(200).send('Address Updated');
		} else {
			res.status(400).send('Address Not Exist');
		}
	} catch (error) {
		res.status(500).json({ error });
	}
};

const deleteAddress = async (req, res) => {
	try {
		const { id } = req.params;

		await addressModel.destroy({
			where: {
				id,
			},
		});

		res.status(200).send('Address Deleted');
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports = {
	getAllAddress,
	getAddressByID,
	createAddress,
	updateAddress,
	deleteAddress,
	getAllAddressByIDClient,
};
