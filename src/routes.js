const express = require('express');
var path = require("path");
//const authServer = require('./services/auth-service');

const InstagramController = require('./controllers/InstagramController');
const MercadoLivreController = require('./controllers/MercadoLivreController');

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


const routes = express.Router();

routes.get('/insta/user', InstagramController.getUserByNickname);
routes.get('/insta/user-profile', InstagramController.getUserProfileByNickname);

routes.get('/mercado-livre/user', MercadoLivreController.getUserByNickname);
routes.get('/mercado-livre/user/reputation', MercadoLivreController.getUserReputationByNickname);

// Steps 
routes.route('/steps/:id')
    .get(StepsController.index)
    .put(StepsController.update)
    .delete(StepsController.delete);

routes.route('/steps')
    .get(StepsController.list)
    .post(StepsController.store);

// Channels
routes.route('/channels/:id')
    .get(ChannelsController.index)
    .put(ChannelsController.update)
    .delete(ChannelsController.delete);

routes.route('/channels')
    .get(ChannelsController.list)
    .post(ChannelsController.store)

// Segments
routes.route('/segments/:id')
    .get(SegmentsController.index)
    .put(SegmentsController.update)
    .delete(SegmentsController.delete);

routes.route('/segments')
    .get(SegmentsController.list)
    .post(SegmentsController.store);

// Lessons
routes.route('/lessons/:id')
    .get(LessonsController.index)
    .put(LessonsController.update)
    .delete(LessonsController.delete);

routes.route('/lessons')
    .get(LessonsController.list)
    .post(LessonsController.store);

// Requirements
routes.route('/requirements/:id')
    .get(RequirementsController.index)
    .put(RequirementsController.update)
    .delete(RequirementsController.delete);

routes.route('/requirements')
    .get(RequirementsController.list)
    .post(RequirementsController.store);

// Routes
routes.route('/routes/:id')
    .get(RoutesController.index)
    .put(RoutesController.update)
    .delete(RoutesController.delete);

routes.route('/routes')
    .get(RoutesController.list)
    .post(RoutesController.store);

routes.route('/routes/:id/lessons')
    .post(RoutesController.storeLesson)
    .put(RoutesController.updateLesson)
    .delete(RoutesController.deleteLesson);



// Users
routes.route('/users/:id')
    .get(UsersController.index)
    .put(UsersController.update)
    .delete(UsersController.delete);

routes.route('/users')
    .get(UsersController.list)
    .post(UsersController.store);

routes.route('/users/:id/companies')
    .post(UsersController.storeCompany)
    .put(UsersController.updateCompany)
    .delete(UsersController.deleteCompany);


// Companies
routes.route('/companies/:id')
    .get(CompaniesController.index)
    .put(CompaniesController.update)
    .delete(CompaniesController.delete);

routes.route('/companies')
    .get(CompaniesController.list)
    .post(CompaniesController.store);

// Done Lessons
routes.route('/done_lessons/:id')
    .get(DoneLessonsController.index)
    .put(DoneLessonsController.update)
    .delete(DoneLessonsController.delete);

routes.route('/done_lessons')
    .get(DoneLessonsController.list)
    .post(DoneLessonsController.store);

// Done Routes
routes.route('/done_routes/:id')
    .get(DoneRoutesController.index)
    .put(DoneRoutesController.update)
    .delete(DoneRoutesController.delete);

routes.route('/done_routes')
    .get(DoneRoutesController.list)
    .post(DoneRoutesController.store);

module.exports = routes;