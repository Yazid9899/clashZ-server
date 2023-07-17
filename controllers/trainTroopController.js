'use strict'
const { Users,Troop,TrainTroops } = require("../models")

class trainTroopController{
    static async addTrainTroop (req,res,next){
        try {
            const {troopId, accId} = req.params
            console.log(req.para);
            const newTrainTroop = await TrainTroops.create({AccountId:accId,TroopId:troopId})
            res.status(200).json({
                message: "Troop Trained!",
            })
        } catch (err) {
            next(err)
        }
    }
    static async allTrainTroop(req,res,next){
        try {
            const {accId} = req.params
            const data = await TrainTroops.findAll({where:{AccountId:accId},include: Troop})
            res.status(200).json({
                data
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = trainTroopController