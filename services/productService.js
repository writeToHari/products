const productCategorySchema = require("../models/categorySchema")

exports.getProductDetails = async (dynamicCondition = {}, searchText = {}, limit, offset) => {
    return productCategorySchema.aggregate([
        {
            '$match': dynamicCondition
        }, {
            '$lookup': {
                'from': 'products',
                'localField': '_id',
                'foreignField': 'category_id',
                'as': 'product_details',
                'pipeline': [
                    { "$match": searchText },
                    { "$limit": offset + limit },
                    { "$skip": offset },

                    {
                        '$lookup': {
                            'from': 'product_reviews_ratings',
                            'localField': '_id',
                            'foreignField': 'product_id',
                            'as': 'reviews_rating_details'
                        }
                    }
                ]
            }
        }
    ])

}