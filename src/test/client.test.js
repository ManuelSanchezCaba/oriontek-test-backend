const supertest = require('supertest');
const app = require('../app');
const server = require('../index');
const db = require('../database');

const clientModel = require('../models/Client');
const { createUserAdmin, getToken } = require('./Helpers/auth');

const api = supertest(app);

const initialClient = [
	{
		isCompany: true,
		shortName: 'empresa',
		longName: 'empresa 001',
		cedulaRNC: '130120000',
		email: 'example@test.com',
		telephone: '(809)888-8888',
		cellphone: '(809)888-8888',
	},
	{
		isCompany: true,
		shortName: 'empresa 2',
		longName: 'empresa 002',
		cedulaRNC: '130120001',
		email: 'example@test.com',
		telephone: '(809)888-8888',
		cellphone: '(809)888-8888',
	},
];

beforeEach(async () => {
	await createUserAdmin();

	await clientModel.destroy({
		where: {},
	});

	for (let client of initialClient) {
		await clientModel.create(client);
	}
});

describe('GET CLIENT', () => {
	test('should return a json', async () => {
		const token = await getToken();

		await api
			.get('/client')
			.set('x-access-token', token)
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('should return all clients', async () => {
		const token = await getToken();
		const response = await api.get('/client').set('x-access-token', token);
		expect(response.body).toHaveLength(initialClient.length);
	});
});

describe('POST CLIENT', () => {
	const client = {
		isCompany: true,
		shortName: 'empresa 3',
		longName: 'empresa 003',
		cedulaRNC: '130120002',
		email: 'example@test.com',
		telephone: '(809)888-8888',
		cellphone: '(809)888-8888',
	};

	test('should return status 200', async () => {
		const token = await getToken();
		await api.post('/client').set('x-access-token', token).send(client).expect(200);
	});

	test('should return message Client Created', async () => {
		const token = await getToken();
		const response = await api.post('/client').set('x-access-token', token).send(client);
		expect(response.text).toContain('Client Created');
	});
});

describe('PUT CLIENT', () => {
	test('should return status 200', async () => {
		const token = await getToken();
		const clients = await clientModel.findAll({ where: {} });
		await api
			.put(`/client/${clients[0].id.toString().replace('undefined', '')}`)
			.set('x-access-token', token)
			.send({ shortName: 'Empresa' })
			.expect(200);
	});

	test('should return message Client Updated', async () => {
		const token = await getToken();
		const clients = await clientModel.findAll({ where: {} });
		const response = await api
			.put(`/client/${clients[0].id.toString().replace('undefined', '')}`)
			.set('x-access-token', token)
			.send({ shortName: 'Empresa' });
		expect(response.text).toContain('Client Updated');
	});
});

describe('DELETE CLIENT', () => {
	test('should return status 200', async () => {
		const token = await getToken();
		const clients = await clientModel.findAll({ where: {} });
		await api
			.delete(`/client/${clients[0].id.toString().replace('undefined', '')}`)
			.set('x-access-token', token)
			.expect(200);
	});

	test('should return message Client Updated', async () => {
		const token = await getToken();
		const clients = await clientModel.findAll({ where: {} });
		const response = await api
			.delete(`/client/${clients[0].id.toString().replace('undefined', '')}`)
			.set('x-access-token', token);
		expect(response.text).toContain('Client Deleted');
	});
});

afterAll(() => {
	db.close();
	server.close();
});
