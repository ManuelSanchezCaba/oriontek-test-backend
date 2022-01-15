const express = require('express');
const router = express.Router();

const { verifyToken, isAdmin, isUser } = require('../middlewares/auth.middleware');

const {
	getAllAddress,
	getAddressByID,
	createAddress,
	updateAddress,
	deleteAddress,
	getAllAddressByIDClient,
} = require('../controllers/address.controllers');

router.get('/', [verifyToken, isUser], getAllAddress);

router.get('/client/:idClient', [verifyToken, isUser], getAllAddressByIDClient);

router.get('/:id', [verifyToken, isUser], getAddressByID);

router.post('/', [verifyToken, isAdmin], createAddress);

router.put('/:id', [verifyToken, isAdmin], updateAddress);

router.delete('/:id', [verifyToken, isAdmin], deleteAddress);

module.exports = router;
