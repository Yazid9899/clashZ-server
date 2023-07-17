'use strict'
const express = require('express');
const router = express.Router()
const userRoutes = require('./user');
const troopRoutes =  require('./troop')
const trainTroopRoutes = require("./trainTroop")


router.use(userRoutes)
router.use('/troops', troopRoutes)
router.use('/traintoops', trainTroopRoutes)

module.exports = router
