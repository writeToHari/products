const express = require('express');

const productController = require("../controllers/productController")
const validation = require("../validation/productSchemaValidation")

const router = express.Router()

router.get('/list', validation.listProductValidation, productController.listProductController)


module.exports = router