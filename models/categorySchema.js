const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    is_active: {
        type: Number,
        default: 1
    },
    is_deleted: {
        type: Number,
        default: 0
    },

}, {
    timestamps: true,
});


var productCategoryModel = mongoose.model('product_categories', categorySchema);
module.exports = productCategoryModel