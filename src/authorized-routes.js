const express = require('express');
const AuthService = require('./services/auth-service');

const StepsController = require('./controllers/StepsController');
const ChannelsController = require('./controllers/ChannelsController');
const SegmentsController = require('./controllers/SegmentsController');
const LessonsController = require('./controllers/LessonsController');
const RequirementsController = require('./controllers/RequirementsController');
const RoutesController = require('./controllers/RoutesController');
const UsersController = require('./controllers/UsersController');
const CompaniesController = require('./controllers/CompaniesController');
const DoneLessonsController = require('./controllers/DoneLessonsController');
const DoneRoutesController = require('./controllers/DoneRoutesController');
const AuthenticationsController = require('./controllers/AuthenticationsController');

const authorized_routes = express.Router();

authorized_routes.use(AuthService.authorize);

authorized_routes.route('/me/companies')
    .get(UsersController.listMeCompany)
    .post(UsersController.storeMeCompany)
    .put(UsersController.updateMeCompany)
    .delete(UsersController.deleteMeCompany);

authorized_routes.route('/me')
    .get(UsersController.meIndex)
    .put(UsersController.meUpdate)
    .delete(UsersController.meDelete);

module.exports = authorized_routes;