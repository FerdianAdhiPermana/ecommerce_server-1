const express = require('express');
const router = express.Router();
const controller = require("../controllers/ProductController")
const authorization = require("../middlewares/authorization")
const authentication = require("../middlewares/authentication")


router.use(authentication)
router.post('/', authorization,controller.Create)
router.get('/', authorization,controller.GetProduct)
router.put('/:id', authorization, controller.Update)
router.delete('/:id', authorization, controller.Delete)



module.exports = router;
