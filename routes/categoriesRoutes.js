const CategoriesControllers = require('../controllers/categoriesControllers');
const passport = require('passport');

module.exports = (app) => {

    //app.get('/api/users/getAll', usersControllers.getAll);

    //app.post('/api/users/create',usersControllers.register);
    app.post('/api/categories/create',passport.authenticate('swt',{session:false}), CategoriesControllers.create);

    //update date
    
    
}