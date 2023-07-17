'use strict'
const { verifyToken } = require('../helpers/jwt');
const {  Users,Troop } = require('../models/index')


const authorizationForDeleteAndEditTroop = async (req, res, next) => {

    try {
        const {id} = req.user
        const {troopId} = req.params
        const troop = await Troop.findOne({where:{id:troopId}})
        console.log(troop);
        if(troop.UserId !== id) throw {name: "authorizationError"}
        next()
    } catch (err) {
        next(err)
    }

}

module.exports = authorizationForDeleteAndEditTroop