const express = require('express');
const router = express.Router();

const { verifyToken, isAdmin, isUser } = require('../middlewares/auth.middleware');

const {
	getAllClient,
	getClientByID,
	createClient,
	updateClient,
	deleteClient,
	getAllClientByIDCompany,
	createClientByIDCompany,
} = require('../controllers/client.controllers');

router.get('/', [verifyToken, isUser], getAllClient);

router.get('/:id', [verifyToken, isUser], getClientByID);

router.get('/company/:idCompany', [verifyToken, isUser], getAllClientByIDCompany);

router.post('/', [verifyToken, isAdmin], createClient);

router.post('/company', [verifyToken, isAdmin], createClientByIDCompany);

router.put('/:id', [verifyToken, isAdmin], updateClient);

router.delete('/:id', [verifyToken, isAdmin], deleteClient);

module.exports = router;
