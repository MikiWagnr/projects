const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Product title is required'],
        minlenght: [1, 'Product title must be at least 1 character long']
    },
    price: {
        type: Number,
        min: [0.01, 'product price cannot be at least 0.01'],
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        minlength: [5, 'product description must be at least 5 charcters long']
    }
}, {timestamps: true})

module.exports = mongoose.model('Product', ProductSchema)