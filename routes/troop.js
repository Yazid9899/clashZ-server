'use strict'
const express = require('express');
const TroopController = require('../controllers/troopController');
const adminAuthentication = require('../middleware/adminAuthentication');
const authorizationForDeleteAndEditTroop = require('../middleware/authorizationForDeleteAndEditTroop');
const router = express.Router()


router.get('/', TroopController.allTroop)
router.post('/add', adminAuthentication, TroopController.addTroop)
router.put('/edit/:troopId', adminAuthentication, authorizationForDeleteAndEditTroop,TroopController.editTroop)
router.delete('/:troopId', adminAuthentication, authorizationForDeleteAndEditTroop,TroopController.editTroop)

module.exports = router
