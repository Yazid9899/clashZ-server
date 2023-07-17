'use strict'
const bcrypt = require('bcrypt')

const hashPassword = (password) =>{
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password,salt)
}
const comparePassword = (input, dbpassword )=>{
    return bcrypt.compareSync(input, dbpassword)
}
module.exports = {hashPassword, comparePassword}