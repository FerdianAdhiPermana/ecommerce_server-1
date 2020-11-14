const verifyToken = require('../helpers/jwt').verifyToken
const user = require('../models/index').user

async function authentication(req, res, next) {
    let { token } = req.headers
    try {
        if(!token){
            throw { msg: "authentication failed"}
        }
        else{
            let decoded = verifyToken(token)
            
            user.findOne({
                where: { email: decoded.email }
            })
            .then(dataUser=>{
                if(!dataUser) throw { msg: "authentication failed"}
                else{
                    req.loggedInUser = decoded
                    next()
                }

            })            
            .catch(err=>{
                console.log(err)
                next(err)                
            })
        }
    } catch (err) {
        next(err)
    }    
}

module.exports = authentication 