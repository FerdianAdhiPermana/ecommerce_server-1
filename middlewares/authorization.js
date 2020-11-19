const { user, product,cart} = require('../models/index')

function authorization(req, res, next){
    try {
        if(req.params.id){
            product.findByPk(req.params.id)
            .then(product=>{
                if(!product) throw {msg: "Product not found"}
                console.log(req.loggedInUser.role)
                if(req.loggedInUser.role === 'admin'){
                    next()
                } 
                else throw {msg: "not authorized", code: 500}
            }).catch(err=>{
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
        console.log(err)
        next(err)
    }
}

function authorizationCart(req, res, next){
    try {
        if(req.params.id){
            cart.findByPk(req.params.id)
            .then(cart=>{
                if(!cart) throw {msg: "Cart not found"}
                console.log(req.loggedInUser)
                if(req.loggedInUser){
                    next()
                } 
                else throw {msg: "not authorized", code: 500}
            }).catch(err=>{
                next(err.message)
            })
        } else {

            if(req.loggedInUser){
                next()
            }else{
                throw {msg: "not authorized", code: 500}
            }
        }
    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = authorization 