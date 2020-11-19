const express = require('express');
const router = express.Router();
const controller = require("../controllers/CartController")
const authorizationCart = require("../middlewares/authorization")

router.get('/', controller.findAll)
router.post('/', controller.create)
router.patch('/:id', authorizationCart, controller.updateQuantity)
router.delete('/:id', authorizationCart, controller.deleteCart)

module.exports = router;
