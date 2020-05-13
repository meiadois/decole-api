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
const AccountsController = require('./controllers/AccountsController');


const authorized_routes = express.Router();

// Users
authorized_routes.route('/me')
    .get(AuthService.authorize, UsersController.meIndex)
    .put(AuthService.authorize, UsersController.meUpdate)
    .delete(AuthService.authorize, UsersController.meDelete);
authorized_routes.put('/me/change_password',
    AuthService.authorize, UsersController.meChangePassword)
authorized_routes.route('/me/introduce')
    .post(AuthService.authorize, UsersController.meIntroduce);
// Companies

authorized_routes.route('/me/companies')
    .get(AuthService.authorize, CompaniesController.meList)
    .post(AuthService.authorize, CompaniesController.meStore)

authorized_routes.route('/me/companies/:id')
    .get(AuthService.authorize, CompaniesController.meIndex)
    .put(AuthService.authorize, CompaniesController.meUpdate)
    .delete(AuthService.authorize, CompaniesController.meDelete)


authorized_routes.route('/me/users/companies')
    .get(AuthService.authorize, UsersController.listMeCompany)
    .post(AuthService.authorize, UsersController.storeMeCompany)
    .put(AuthService.authorize, UsersController.updateMeCompany)
    .delete(AuthService.authorize, UsersController.deleteMeCompany);
// Done Routes    
authorized_routes.route('/me/done_routes')
    .get(AuthService.authorize, DoneRoutesController.meList);
authorized_routes.route('/me/done_routes/:route_id')
    .post(AuthService.authorize, DoneRoutesController.meStore)
//.post(AuthService.authorize, DoneRoutesController.meIndex);


// Done Lessons  
authorized_routes.route('/me/done_lessons')
    .get(AuthService.authorize, DoneLessonsController.meList)
    .post(AuthService.authorize, DoneLessonsController.meStore)

// Accounts
authorized_routes.route('/me/accounts/:channel_name')
    .get(AuthService.authorize, AccountsController.meIndex)
    .put(AuthService.authorize, AccountsController.meUpdate)
    .delete(AuthService.authorize, AccountsController.meDelete)


authorized_routes.route('/me/accounts')
    .get(AuthService.authorize, AccountsController.meList)
    .post(AuthService.authorize, AccountsController.meStore);

authorized_routes.route('/me/routes')
    .get(AuthService.authorize, RoutesController.meListWithProgress);
authorized_routes.route('/me/routes/:id')
    .get(AuthService.authorize, RoutesController.meIndexWithProgress);

module.exports = authorized_routes;