'use strict'
const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { Users } = require("../models")
const { default: axios } = require("axios")
const mailBoxToken = process.env.MAILBOX
const midtransClient = require('midtrans-client');

class UserController {
    static async googleLogin(req,res,next){
        try {
            const {email} = req.body
            if (!email) throw { name: "loginError" }

            const [user, createdUser] = await Users.findOrCreate({
                where: { email: email },
                defaults: {
                    email: email,
                    password: "12345",
                },
            })
            const access_token = signToken({
                id: user.id,
                email: user.email,
                role: user.role,
                fiture: user.fiture
            })
            res.status(200).json({
                access_token,
                email: user.email,
                role: user.role,
                fiture: user.fiture
            })
        } catch (err) {
            next(err)
        }
    }
    static async register(req, res, next) {
        try {
            const { email, password } = req.body
            const { data } = await axios({
                method: "GET",
                url: `http://apilayer.net/api/check?access_key=d20a3f04d31054912ea93a390662b706&email=${email}&smtp=1&format=1`
            })
            if (!data.mx_found || !data.smtp_check || data.disposable) throw { name: "emailError" }
            const user = await Users.create({ email, password })
            res.status(200).json({
                id: user.id,
                email: user.email
            })
        } catch (err) {
            next(err)
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) throw { name: "loginError" }


            const user = await Users.findOne({ where: { email: email } })
            if (!user) throw { name: "loginError" }

            if (!comparePassword(password, user.password)) throw { name: "loginError" }

            const access_token = signToken({
                id: user.id,
                email: user.email,
                role: user.role,
                fiture: user.fiture
            })

            res.status(200).json({
                access_token,
                email: user.email,
                role: user.role,
                fiture: user.fiture
            })
        } catch (err) {
            next(err)
        }
    }
    static async tokenMidtrans(req, res, next) {
        try {
            const { id, email, fiture } = req.user
            if (fiture !== 'false') throw{name:'fitureError'}
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: "SB-Mid-server-RvTgawkLSZNACOgPKnNBu3P0"
            });
            let parameter = {
                "transaction_details": {
                    "order_id": "YOUR-ORDERID-" + Math.floor(10000 + Math.random()*99999),
                    "gross_amount": 50000
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "email": email,
                }
            };
            const midtransToken =await snap.createTransaction(parameter)
            res.status(200).json(midtransToken)
        } catch (err) {
            next(err)
        }
    }
    static async buyFeature(req,res,next){
        try {
            const {id,email} = req.user

            const data = await Users.update({fiture:'true'},{where:{email:email}})

            res.status(200).json({
                message: "features have been purchased"
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController
