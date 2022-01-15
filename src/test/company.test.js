const supertest = require('supertest');
const app = require('../app');
const server = require('../index');
const db = require('../database');

const companyModel = require('../models/Company');
const { createUserAdmin, getToken } = require('./Helpers/auth');

const api = supertest(app);

const initialCompany = [
	{
		shortName: 'empresa',
		longName: 'empresa 001',
		rnc: '130120000',
		telephone: '(809)888-8888',
		telephone2: '(809)888-8888',
		email: 'example@test.com',
		address: 'direcc.',
	},
	{
		shortName: 'empresa 2',
		longName: 'empresa 002',
		rnc: '130120001',
		telephone: '(809)888-8888',
		telephone2: '(809)888-8888',
		email: 'example@test.com',
		address: 'direcc.',
	},
];

beforeEach(async () => {
	await createUserAdmin();

	await companyModel.destroy({
		where: {},
	});

	for (let company of initialCompany) {
		await companyModel.create(company);
	}
});

describe('GET COMPANY', () => {
	test('should return a json', async () => {
		const token = await getToken();

		await api
			.get('/company')
			.set('x-access-token', token)
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('should return all companies', async () => {
		const token = await getToken();
		const response = await api.get('/company').set('x-access-token', token);
		expect(response.body).toHaveLength(initialCompany.length);
	});
});

describe('POST COMPANY', () => {
	const company = {
		shortName: 'empresa 3',
		longName: 'empresa 003',
		rnc: '130120002',
		telephone: '(809)888-8888',
		telephone2: '(809)888-8888',
		email: 'example@test.com',
		address: 'direcc.',
	};

	test('should return status 200', async () => {
		const token = await getToken();
		await api.post('/company').set('x-access-token', token).send(company).expect(200);
	});

	test('should return message Company Created', async () => {
		const token = await getToken();
		const response = await api.post('/company').set('x-access-token', token).send(company);
		expect(response.text).toContain('Company Created');
	});
});

describe('PUT COMPANY', () => {
	test('should return status 200', async () => {
		const token = await getToken();
		const companies = await companyModel.findAll({ where: {} });
		await api
			.put(`/company/${companies[0].id.toString().replace('undefined', '')}`)
			.set('x-access-token', token)
			.send({ shortName: 'Empresa' })
			.expect(200);
	});

	test('should return message Company Updated', async () => {
		const token = await getToken();
		const companies = await companyModel.findAll({ where: {} });
		const response = await api
			.put(`/company/${companies[0].id.toString().replace('undefined', '')}`)
			.set('x-access-token', token)
			.send({ shortName: 'Empresa' });
		expect(response.text).toContain('Company Updated');
	});
});

describe('DELETE COMPANY', () => {
	test('should return status 200', async () => {
		const token = await getToken();
		const companies = await companyModel.findAll({ where: {} });
		await api
			.delete(`/company/${companies[0].id.toString().replace('undefined', '')}`)
			.set('x-access-token', token)
			.expect(200);
	});

	test('should return message Company Updated', async () => {
		const token = await getToken();
		const companies = await companyModel.findAll({ where: {} });
		const response = await api
			.delete(`/company/${companies[0].id.toString().replace('undefined', '')}`)
			.set('x-access-token', token);
		expect(response.text).toContain('Company Deleted');
	});
});

afterAll(() => {
	db.close();
	server.close();
});
