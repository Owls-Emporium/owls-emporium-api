const usersControllers = require('../controllers/usersControllers');
const passport = require('passport');

module.exports = (app, upload) => {
    
    app.get('/api/users/getAll', usersControllers.getAll);

    app.post('/api/users/create',usersControllers.register);
    app.post('/api/users/login',usersControllers.login);

    //para actualizar datos
    //app.put('/api/users/update', upload.array('image', 1), UsersController.update);
    //app.put('/api/users/updateWithoutImage', UsersController.updateWithoutImage);

}