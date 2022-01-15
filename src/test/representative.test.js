const supertest = require('supertest');
const app = require('../app');
const server = require('../index');
const db = require('../database');

const representativeModel = require('../models/Representative');
const clientModel = require('../models/Client');
const { createUserAdmin, getToken } = require('./Helpers/auth');

const api = supertest(app);

const initialRepresentative = [
	{
		idClient: '56',
		name: 'Representante 1',
		telephone: '(809)888-8888',
		telephone2: '(809)888-8888',
		cellphone: '(809)888-8888',
		email: 'example@test.com',
	},
	{
		idClient: '56',
		name: 'Representante 2',
		telephone: '(809)888-8888',
		telephone2: '(809)888-8888',
		cellphone: '(809)888-8888',
		email: 'example@test.com',
	},
];

const clientTest = {
	isCompany: true,
	shortName: 'empresa',
	longName: 'empresa 001',
	cedulaRNC: '130120000',
	email: 'example@test.com',
	telephone: '(809)888-8888',
	cellphone: '(809)888-8888',
};

beforeEach(async () => {
	await createUserAdmin();

	await representativeModel.destroy({
		where: {},
	});

	await clientModel.create(clientTest);

	const clients = await clientModel.findAll({ where: {} });

	for (let representative of initialRepresentative) {
		representative.idClient = clients[0].id.toString().replace('undefined', '');
		await representativeModel.create(representative);
	}
});

describe('GET REPRESENTATIVE', () => {
	test('should return a json', async () => {
		const token = await getToken();

		await api
			.get('/representative')
			.set('x-access-token', token)
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('should return all representatives', async () => {
		const token = await getToken();
		const response = await api.get('/representative').set('x-access-token', token);
		expect(response.body).toHaveLength(initialRepresentative.length);
	});
});

describe('POST REPRESENTATIVE', () => {
	const representative = {
		idClient: '56',
		name: 'Representante 3',
		telephone: '(809)888-8888',
		telephone2: '(809)888-8888',
		cellphone: '(809)888-8888',
		email: 'example@test.com',
	};

	test('should return status 200', async () => {
		const clients = await clientModel.findAll({ where: {} });
		representative.idClient = clients[0].id.toString().replace('undefined', '');
		const token = await getToken();
		await api.post('/representative').set('x-access-token', token).send(representative).expect(200);
	});

	test('should return message Representative Created', async () => {
		const clients = await clientModel.findAll({ where: {} });
		representative.idClient = clients[0].id.toString().replace('undefined', '');
		const token = await getToken();
		const response = await api
			.post('/representative')
			.set('x-access-token', token)
			.send(representative);
		expect(response.text).toContain('Representative Created');
	});
});

describe('PUT REPRESENTATIVE', () => {
	test('should return status 200', async () => {
		const token = await getToken();
		const representatives = await representativeModel.findAll({ where: {} });
		await api
			.put(`/representative/${representatives[0].id.toString().replace('undefined', '')}`)
			.set('x-access-token', token)
			.send({ name: 'Representante 01' })
			.expect(200);
	});

	test('should return message Representative Updated', async () => {
		const token = await getToken();
		const representatives = await representativeModel.findAll({ where: {} });
		const response = await api
			.put(`/representative/${representatives[0].id.toString().replace('undefined', '')}`)
			.set('x-access-token', token)
			.send({ name: 'Representante 01' });
		expect(response.text).toContain('Representative Updated');
	});
});

describe('DELETE REPRESENTATIVE', () => {
	test('should return status 200', async () => {
		const token = await getToken();
		const representatives = await representativeModel.findAll({ where: {} });
		await api
			.delete(`/representative/${representatives[0].id.toString().replace('undefined', '')}`)
			.set('x-access-token', token)
			.expect(200);
	});

	test('should return message Representative Updated', async () => {
		const token = await getToken();
		const representatives = await representativeModel.findAll({ where: {} });
		const response = await api
			.delete(`/representative/${representatives[0].id.toString().replace('undefined', '')}`)
			.set('x-access-token', token);
		expect(response.text).toContain('Representative Deleted');
	});
});

afterAll(() => {
	db.close();
	server.close();
});
