'use strict'
const { Users,Troop } = require("../models")

class TroopController{
    static async allTroop (req,res,next){
        try {
            const troop = await Troop.findAll()

            res.status(200).json({
                troop
            })
        } catch (err) {
            next(err)
        }
    }
    static async addTroop(req,res,next){
        try {
            const {name,type,space,imageUrl} = req.body
            const {id} =req.user
            if(!name||!type||!space||!imageUrl) throw {name:"inputError"}
            const data = await Troop.create({name,type,space,imageUrl,UserId:id})
            res.status(200).json({
                message: 'Troop added'
            })
        } catch (err) {
            next(err)
        }
    }
    static async editTroop(req,res,next){
        try {
            const {name,type,space,imageUrl} = req.body
            const {troopId} = req.params

            const data = await Troop.update({name,type,space,imageUrl},{where:{id:troopId}})

            res.status(200).json({
                message:"Troop edited"
            })
        } catch (err) {
            next(err)
        }
    }
    static async authorizationForDeleteAndEditTroop(req,res,next){
        try {
            const {troopId} = req.params
            await Troop.destroy({where:{id:troopId}})
            res.status(200).json({
                message: "troop deleted"
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TroopController