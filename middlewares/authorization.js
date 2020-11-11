const { User, Product} = require('../models/index')

function authorization(req, res, next){
    try {
        if(req.params.id){
            Product.findByPk(req.params.id)
            .then(product=>{
                if(!product) throw {msg: "Product not found"}
                if(req.loggedInUser.role === 'admin'){
                    next()
                } 
                else throw {msg: "not authorized", code: 500}
            }).catch(err=>{
                console.log(err)
                next(err.message)
            })
        } else {

            if(req.loggedInUser.role === 'admin'){
                next()
            }else{
                throw {msg: "not authorized", code: 500}
            }
        }
    } catch (err) {
        // console.log(err,'akdjfldas;l')
        next(err)
    }
}

module.exports = authorization 