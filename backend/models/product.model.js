const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
}, 
    { timestamps: true }


);

const Product = mongoose.model('Product', productSchema);

module.exports =  Product ;