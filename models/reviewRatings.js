const mongoose = require('mongoose')

const reviewRatingSchema = mongoose.Schema({
    rating: {
        type: Number,
        default: 0
    },
    comment: {
        type: String,
        default: ""
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        default: null
    },
    date: {
        type: String,
        default: null
    },
    reviewer_name: {
        type: String,
        default: null
    },
    reviewer_email: {
        type: String,
        default: null
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


var productReviewSettingsModel = mongoose.model('product_reviews_ratings', reviewRatingSchema);
module.exports = productReviewSettingsModel