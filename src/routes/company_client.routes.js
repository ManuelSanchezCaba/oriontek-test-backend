const express = require('express');
const router = express.Router();

const {
	getAllCompanyClient,
	getCompanyClientByID,
	createCompanyClient,
	updateCompanyClient,
	deleteCompanyClient,
} = require('../controllers/company_client.controllers');

const { verifyToken, isAdmin, isUser } = require('../middlewares/auth.middleware');

router.get('/', [verifyToken, isUser], getAllCompanyClient);

router.get('/:id', [verifyToken, isUser], getCompanyClientByID);

router.post('/', [verifyToken, isAdmin], createCompanyClient);

router.put('/:id', [verifyToken, isAdmin], updateCompanyClient);

router.delete('/:id', [verifyToken, isAdmin], deleteCompanyClient);

module.exports = router;
