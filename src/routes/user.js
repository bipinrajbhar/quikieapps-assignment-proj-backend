const Router = require('express').Router();
const { signup, signin, user } = require('../controllers/user');
const isAuth = require('./middleware/isAuth');

Router.route('/signup').post(signup);
Router.route('/signin').post(signin);
Router.route('/user').get(isAuth, user);

module.exports = Router;
