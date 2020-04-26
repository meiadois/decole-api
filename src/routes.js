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

// Routes
routes.route('/routes/:id/lessons')
    .post(RoutesController.storeLesson)
    .put(RoutesController.updateLesson)
    .delete(RoutesController.deleteLesson)
    
module.exports = routes;