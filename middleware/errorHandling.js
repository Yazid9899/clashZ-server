'use strict'
const errorHandling = async (err, req, res, next) => {
    console.log(err);
    switch (err.name) {
        case "emailError":
            res.status(400).json({
                message: "Invalid email Address"
            })
            break;
        case "SequelizeValidationError":
            const sequelizeError = err.errors.map(el => el.message)
            res.status(400).json({
                message: sequelizeError
            })
            break;
        case "SequelizeUniqueConstraintError":
            res.status(400).json({
                message: "Email already used"
            })
            break;
        case "loginError":
            res.status(401).json({
                message: 'invalid email or password'
            })
            break;
        case "accountError":
            res.status(402).json({
                message: 'Invalid Account'
            })
            break;
        case "accountErrorUsed":
            res.status(402).json({
                message: 'Account Used'
            })
            break;
        case "fitureError":
            res.status(403).json({
                message: 'Already Buy Fiture'
            })
            break;
        default:
            res.status(500).json({
                err
            })
            break;
    }
}
module.exports = errorHandling