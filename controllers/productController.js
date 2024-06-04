const Types = require('mongoose').Types

const commonStatusCode = require("../middleware/statusCode")
const errorHandler = require('../middleware/errorHandler')
const successMessage = require('../middleware/successMessage')
const successHandler = require('../middleware/successHandler')
const productService = require("../services/productService")


exports.listProductController = async (req, res, next) => {
    try {

        var dynamicFilterCondition = {}
        var searchProducts = {}
        if (req.query['category_id']) {
            dynamicFilterCondition['_id'] = new Types.ObjectId(req.query['category_id'])
        }
        if (req.query['search_text']) {
            searchProducts['title'] = { $regex: req.query['search_text'], "$options": "i" }
        }
        var page = Number(req.query.page) || 1
        var limit = Number(req.query.limit) || 10
        var offset = (page - 1) * limit
        var getProductList = await productService.getProductDetails(dynamicFilterCondition, searchProducts, limit, offset)
        if (getProductList.length != 0) {
            successHandler({
                statusCode: commonStatusCode.successCodes.OK,
                message: successMessage.Messages.PRODUCTS_LIST,
                data: getProductList
            }, req, res, next)
        } else {
            successHandler({
                statusCode: commonStatusCode.successCodes.OK,
                message: successMessage.Messages.DATA_NOT_FOUND,
                data: getProductList
            }, req, res, next)
        }

    } catch (error) {
        errorHandler({
            statusCode: commonStatusCode.serverCodes.Internal_Server_Error,
            message: error.message
        }, req, res, next)
    }
}