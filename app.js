const express = require('express')
const app = express()
const cartsRouter = require('./routes/carts');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const errorHandler = require("./middlewares/errorhandler")
const cors = require("cors");
require('dotenv').config();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/carts', cartsRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use(errorHandler)

module.exports = app