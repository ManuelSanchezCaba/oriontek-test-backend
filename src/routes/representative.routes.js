const express = require('express');
const router = express.Router();

const { verifyToken, isAdmin, isUser } = require('../middlewares/auth.middleware');

const {
	getAllRepresentative,
	getRepresentativeByID,
	createRepresentative,
	updateRepresentative,
	deleteRepresentative,
	getAllRepresentativesByIDClient,
} = require('../controllers/representative.controllers');

router.get('/', [verifyToken, isUser], getAllRepresentative);

router.get('/client/:idClient', [verifyToken, isUser], getAllRepresentativesByIDClient);

router.get('/:id', [verifyToken, isUser], getRepresentativeByID);

router.post('/', [verifyToken, isAdmin], createRepresentative);

router.put('/:id', [verifyToken, isAdmin], updateRepresentative);

router.delete('/:id', [verifyToken, isAdmin], deleteRepresentative);

module.exports = router;
