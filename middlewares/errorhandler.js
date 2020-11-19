const response = require("../helpers/response")

function errorhandler(err, req, res, next){
    let status = 500
    let errors = {} || "internal server error"
    let errorList = [];

    switch(err.name){
        case "SequelizeValidationError": 
            err.errors.forEach((elemen) => {
                errorList.push(elemen.msg)
            })
            errors = errorList
            status = 400
            break;
            case 'SequelizeUniqueConstraintError':
            err.errors.forEach(el => {
                errors.push(el.message, 'email already exist')
            })
            code = 400
            break
        default:
            errors = err.msg
            status = err.code || 500
            break;
    }

    res.status(status).json(response.onFailed(errors))
}   

module.exports = errorhandler