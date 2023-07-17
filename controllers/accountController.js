'use strict'
const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { Users, Account } = require("../models")
const { default: axios } = require("axios")
const tokenCoc = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjUwM2FmOGM5LTc1ZDUtNDUxZC05YzAzLTUwNDk1ZGZjYjAyZCIsImlhdCI6MTY4NTQyNzU2MCwic3ViIjoiZGV2ZWxvcGVyLzkzOTYzOTZjLWI5ZGUtZjMxMi00ZTc1LTQ0NmU0NGNjODU2NCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE4Mi4zLjM4LjIwMiIsIjI3LjUwLjI5LjExNyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.xBdYU5Tg2SwvnTLRfZNZgAP2sH6OEqZOt9aGfXTPa-UFd7FnJoMKYqWCisN_3_gDXMU1tR7nwzhPRPwKx3XXwQ'
class AccountController {
    static async addAccount(req, res, next) {
        try {
            const { playerTag, token } = req.body
            const { id } = req.user
            const { data: verify } = await axios({
                method: "POST",
                url: `https://api.clashofclans.com/v1/players/%23${playerTag}/verifytoken`,
                headers: {
                    Authorization: `Bearer ${tokenCoc}`
                },
                data: {
                    token: token
                }
            })
            if (!verify || verify.status !== "ok") throw { name: "accountError" }
            const { data } = await axios({
                method: "GET",
                url: `https://api.clashofclans.com/v1/players/%23${playerTag}`,
                headers: {
                    Authorization: `Bearer ${tokenCoc}`
                }
            })
            let maxTroop;
            let maxSpell;
            switch (data.townHallLevel) {
                case 1:
                    maxTroop = 20
                    maxSpell = 0
                    break;
                case 2:
                    maxTroop = 30
                    maxSpell = 0
                    break;
                case 3:
                    maxTroop = 70
                    maxSpell = 0
                    break;
                case 4:
                    maxTroop = 80
                    maxSpell = 0
                    break;
                case 5:
                    maxTroop = 135
                    maxSpell = 2
                    break;
                case 6:
                    maxTroop = 150
                    maxSpell = 4
                    break;
                case 7:
                    maxTroop = 200
                    maxSpell = 4
                    break;
                case 8:
                    maxTroop = 200
                    maxSpell = 4
                    break;
                case 9:
                    maxTroop = 220
                    maxSpell = 8
                    break;
                case 10:
                    maxTroop = 240
                    maxSpell = 10
                    break;
                case 11:
                    maxTroop = 260
                    maxSpell = 10
                    break;
                case 12:
                    maxTroop = 280
                    maxSpell = 10
                    break;
                case 13:
                    maxTroop = 300
                    maxSpell = 10
                    break;
                case 14:
                    maxTroop = 300
                    maxSpell = 10
                    break;
                case 15:
                    maxTroop = 320
                    maxSpell = 10
                    break;
            }
            const [user, created] = await Account.findOrCreate({
                where: { playerTag: playerTag },
                defaults: {
                    playerTag: playerTag,
                    UserId: id,
                    maxSpace: maxTroop,
                    maxSpell: maxSpell,
                    name: data.name,
                    level: data.expLevel,
                    townHallLevel: data.townHallLevel,
                    trophies:data.trophies
                }
            })
            if (!created) throw { name: "accountErrorUsed" }
            console.log(data.name);
            res.status(200).json({
                message: "created",
                user,
                data
            })
        } catch (err) {
            next(err)
        }
    }
    static async getMyAccount(req, res, next) {
        try {
            const { id, email,fiture } = req.user
            const account = await Account.findAll({ where: { UserId: id } })
            res.status(200).json({
                fiture,
                account
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = AccountController
