const express = require('express')

const productRoutes = require('./productRoute')

const app = express()


app.use('/products', productRoutes)

module.exports = app