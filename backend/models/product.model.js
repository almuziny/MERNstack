const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    Price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    Categorie: {
        type: Number,
        default: 1
    },
}, 
    { timestamps: true }


);

productSchema.index({ 
    title:'text',
    description: 'text',
}, {
    weights: {
        name: 5,
        description: 1,
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports =  Product ;