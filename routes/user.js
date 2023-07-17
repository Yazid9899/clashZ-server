'use strict'
const express = require('express');
const UserController = require('../controllers/userController');
const AccountController = require('../controllers/accountController');
const authentication = require('../middleware/authentication');
const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/accounts/add',authentication ,AccountController.addAccount)
router.get('/accounts',authentication ,AccountController.getMyAccount)
router.post('/midTrans-Token',authentication ,UserController.tokenMidtrans)
router.patch('/buyFeature',authentication ,UserController.buyFeature)
router.post('/logInGoogle', UserController.googleLogin)


module.exports = router 