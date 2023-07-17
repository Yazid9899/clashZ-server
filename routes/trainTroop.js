'use strict'
const express = require('express');
const authentication = require('../middleware/authentication');
const trainTroopController = require('../controllers/trainTroopController');
const router = express.Router()

// const ProductController = require('../controllers/productControllers');
// const authentication = require('../middleware/authentication');

router.post('/:troopId/:accId', authentication, trainTroopController.addTrainTroop)
router.get('/:accId', authentication, trainTroopController.allTrainTroop)

module.exports = router