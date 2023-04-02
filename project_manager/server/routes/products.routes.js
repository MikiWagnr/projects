const productController = require('../controllers/product.controller')

module.exports = (app)=>{
    //CRRUD : create, read all, read one, update, delete.
    //create
    app.post('/api/products/new', productController.addProduct)
    //read all
    app.get('/api/products', productController.allProducts)
    // read one
    app.get('/api/product/:id', productController.oneProduct)
    //update one
    app.put('/api/product/:id', productController.updateProduct)
    //delete
    app.delete('/api/product/:id', productController.deleteProduct)
}