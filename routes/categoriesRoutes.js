const CategoriesControllers = require('../controllers/categoriesControllers');
const passport = require('passport');

module.exports = (app) => {

    //app.get('/api/users/getAll', CategoriesControllers.getAll);

    app.post('/api/categories/create',CategoriesControllers.create);
    //app.post('/api/categories/create',passport.authenticate('swt',{session:false}), CategoriesControllers.create);

    //update date
    
    
}