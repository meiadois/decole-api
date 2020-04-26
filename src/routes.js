const express = require('express');
var path = require("path");
//const authServer = require('./services/auth-service');

const InstagramController = require('./controllers/InstagramController');
const MercadoLivreController = require('./controllers/MercadoLivreController');

const StepsController = require('./controllers/StepsController');
const ChannelsController = require('./controllers/ChannelsController');
const SegmentsController = require('./controllers/SegmentsController');
const routes = express.Router();

routes.get('/insta/user', InstagramController.getUserByNickname);
routes.get('/insta/user-profile', InstagramController.getUserProfileByNickname);

routes.get('/mercado-livre/user', MercadoLivreController.getUserByNickname);
routes.get('/mercado-livre/user/reputation', MercadoLivreController.getUserReputationByNickname);

// Steps 
routes.route('/steps/:id')
    .get(StepsController.index)
    .put(StepsController.update)
    .delete(StepsController.delete)

routes.route('/steps')
    .get(StepsController.list)
    .post(StepsController.store)

// Channels
routes.route('/channels/:id')
    .get(ChannelsController.index)
    .put(ChannelsController.update)
    .delete(ChannelsController.delete)

routes.route('/channels')
    .get(ChannelsController.list)
    .post(ChannelsController.store)

// Segments
routes.route('/segments/:id')
    .get(SegmentsController.index)
    .put(SegmentsController.update)
    .delete(SegmentsController.delete)

routes.route('/segments')
    .get(SegmentsController.list)
    .post(SegmentsController.store)

module.exports = routes;