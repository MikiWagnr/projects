const Product = require('../models/product.model')

//create
module.exports.addProduct = (req,res) => {
    const newProduct = req.body
    Product.create(newProduct)
        .then(product => res.json(product))
        .catch(err => res.status(400).json(err))
}

//read all
module.exports.allProducts = (_req,res) => {
    Product.find()
        .then((products) => res.json(products))
        .catch((err) => res.json(err))
}

//read one
module.exports.oneProduct = (req,res) => {
    const idFromParams = req.params.id
    Product.findOne({_id: idFromParams})
        .then((oneproduct) => res.json(oneproduct))
        .catch((err) => res.json(err))
}

//update

module.exports.updateProduct = (req,res) => {
    const idFromParams = req.params.id
    const updatedValue = req.body
    //update: criteria, updatedValue, options
    Product.findOneAndUpdate({_id: idFromParams}, updatedValue, {new: true, runValidators: true})
        .then((updatedProduct) => res.json(updatedProduct))
        .catch((err) => res.status(400).json(err))
}

module.exports.deleteProduct = (req,res) => {
    const idFromParams = req.params.id
    Product.deleteOne({_id: idFromParams})
        .then((message) => res.json(message))
        .catch((err) => res.json(err))
}