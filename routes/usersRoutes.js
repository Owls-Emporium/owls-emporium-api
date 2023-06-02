const usersControllers = require('../controllers/usersControllers');
const UsersController = require('../controllers/usersControllers');

module.exports = (app) => {
    app.get('/api/users/getAll', usersControllers.getAll);

    app.post('/api/users/create',usersControllers.register);
}