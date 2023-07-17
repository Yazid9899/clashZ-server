'use strict'
const { verifyToken } = require('../helpers/jwt');
const {  Users } = require('../models/index')


const adminAuthentication = async (req, res, next) => {

    try {
        const { access_token } = req.headers;
        if (!access_token) {
            throw { name: "unauthenticated" }
        }
        const payload = verifyToken(access_token)
        if(payload.name === "JsonWebTokenError") throw { name: "unauthenticated" }
        let user = {}
        if (payload.role !== 'Admin') {
            throw { name: "unauthenticated" }
        } else {
            user = await Users.findOne({ where: { id: payload.id } })
        }
        if (!user) throw { name: "unauthenticated" }
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,
        }
        next()
    } catch (err) {
        next(err)
    }

}

module.exports = adminAuthentication