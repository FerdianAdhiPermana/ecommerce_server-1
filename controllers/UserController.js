const user = require('../models/index').user
const bcrypt = require('bcryptjs')
const generateToken = require('../helpers/jwt').generateToken
const response = require("../helpers/response")

class UserController{
        static login(req, res, next){
        try {
            console.log(req.body)
            const { email, password, role} = req.body
            user.findOne({
                where: { email }
            })
                .then((dataUser) => {
                    if(!dataUser){
                        return res.status(401).json(response.onFailed("invalid email"))
                    }
                    
                    if(dataUser.role !== 'admin'){
                        return res.status(403).json(response.onFailed("admin only"))
                    }
                    const samePassword = bcrypt.compareSync(password, dataUser.password)
                    if(!samePassword) {
                        return res.status(401).json(response.onFailed("invalid password"))
                    }else{
                        let payload = {
                            id: dataUser.id, 
                            email: dataUser.email,
                            role: dataUser.role
                        }
                        let token = generateToken(payload)
                        res.status(200).json({ token })
                    }
                })
                .catch((err) => {
                    console.log(err)
                    next(err)
                })   
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

}

module.exports = UserController 