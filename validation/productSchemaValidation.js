const joi = require('joi')

const errorHandler = require('../middleware/errorHandler')
const commonStatusCode = require('../middleware/statusCode')

const schema = {
    listProductSchema: joi.object({
        search_text: joi.string().optional(),
        page: joi.number().optional(),
        limit: joi.number().optional(),
        category_id: joi.string().hex().length(24).optional()
    }),
}

exports.listProductValidation = (req, res, next) => {
    const { error } = schema.listProductSchema.validate(req.query)
    if (error) {
        errorHandler({
            statusCode: commonStatusCode.clientCodes.Bad_Request,
            message: error.details[0].message
        }, req, res, next)
    } else {
        next();
    }
}