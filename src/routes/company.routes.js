const express = require('express');
const router = express.Router();

const { verifyToken, isAdmin, isUser } = require('../middlewares/auth.middleware');

const {
	getAllCompany,
	getCompanyByID,
	createCompany,
	updateCompany,
	deleteCompany,
} = require('../controllers/company.controllers');

router.get('/', [verifyToken, isUser], getAllCompany);

router.get('/:id', [verifyToken, isUser], getCompanyByID);

router.post('/', [verifyToken, isAdmin], createCompany);

router.put('/:id', [verifyToken, isAdmin], updateCompany);

router.delete('/:id', [verifyToken, isAdmin], deleteCompany);

module.exports = router;
