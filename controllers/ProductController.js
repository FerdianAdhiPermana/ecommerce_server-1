const model = require("../models/index").product
const response = require("../helpers/response")

class productController{


    static Create(req, res, next){
        try {
            const data = req.body;
            const userId = req.loggedInUser.id
            const product = {
                name : data.name,
                image_url: data.image_url,
                price: data.price,
                stock: data.stock,
                creator_id: userId,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            model.create(product)
              .then(data=>{ 
                  res.status(201).json(response.onSuccess("success save product",data))
              })
              .catch(err=>{
                  next(err)
              });
         } catch (err) {
           next(err)
         }        
    }
    
    static GetProduct(req, res, next){
        try {      
            const userId = req.loggedInUser.id
            model.findAll({where : {creator_id: userId}})
              .then(data=>{
                  res.status(200).json(response.onSuccess("success get product",data))
              })
              .catch(err=>{
           console.log(err);

                  next(err)
              })   
         } catch (err) {
           console.log(err);
           next(err)
         }        
    }

    static Update(req, res, next){
        try {      
            
            const data = req.body;
            const product = {
                name : data.name,
                image_url: data.image_url,
                price:  data.price,
                stock:  data.stock,
                updatedAt: new Date()
            }

            model.findByPk(req.params.id)
              .then(data=>{ 
                if(req.loggedInUser.role !== 'admin'){
                  return res.status(403).json(response.onSuccess(" admin only",data))
                }
                 if(!data){
                  return res.status(400).json(response.onFailed("product not found"))
                }
                  data.update(product)
                  .then(data=>{
                      res.status(200).json(response.onSuccess("success update product",data))
                  })
                  .catch(err=>{
                    next(err)
                  })
              })
              .catch(err=>{
                    next(err)
              })
         } catch (err) {
           next(err)
         }        
    }


    static Delete(req, res, next){
        try {
            model.findByPk(req.params.id)
              .then(data=>{
                if(req.loggedInUser.role !== 'admin'){
                  return res.status(403).json(response.onSuccess(" admin only",data))
                }
                if(!data){
                  return  res.status(400).json(response.onFailed("product not found"))            
                }
                data.destroy()
                  .then(data=>{
                    res.status(200).json(response.onSuccess("success delete product",data))  
                })
              })
              .catch(err=>{
                console.log(err)
                next(err)

              }
              )
         } catch (err) {
           console.log(err)
           next(err)
         }        
    }
}

module.exports = productController;