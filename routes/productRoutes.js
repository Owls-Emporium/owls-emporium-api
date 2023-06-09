const ProductsController = require('../controllers/productsController');
const passport = require('passport');

module.exports = (app, upload) => {
    app.get('/api/products/getAll', ProductsController.getAll);

    //app.get('/api/products/finByCategory/:id_category', passport.authenticate('jwt',{session: false}), ProductsController.finByCategory);
    app.get('/api/products/finByCategory/:id_category', ProductsController.finByCategory);

    app.post('/api/products/create', passport.authenticate('jwt',{session: false}), upload.array('image', 3), ProductsController.create);
    //app.post('/api/products/create', ProductsController.create);

}