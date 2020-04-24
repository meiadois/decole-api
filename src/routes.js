const express = require('express');
var path = require("path");
//const authServer = require('./services/auth-service');

const InstagramController = require('./controllers/InstagramController');
const MercadoLivreController = require('./controllers/MercadoLivreController');

const StepsController = require('./controllers/StepsController');
const MarketplacesController = require('./controllers/MarketplacesController');
const routes = express.Router();

/*
routes.get('/products', ProductsController.index);
routes.post('/products', ProductsController.store);
routes.get('/products/:id', ProductsController.get);
routes.put('/products/:id', ProductsController.update);
routes.delete('/products/:id', ProductsController.delete);
routes.options('/products', ProductsController.options);
*/
routes.get('/insta/user', InstagramController.getUserByNickname);
routes.get('/insta/user-profile', InstagramController.getUserProfileByNickname);

routes.get('/mercado-livre/user', MercadoLivreController.getUserByNickname);
routes.get('/mercado-livre/user/reputation', MercadoLivreController.getUserReputationByNickname);

routes.route('/steps/:id', StepsController.index);
routes.route('/steps')
    .get(StepsController.list)
    .post(StepsController.store)

routes.route('/marketplaces/:id', MarketplacesController.index);
routes.route('/marketplaces')
    .get(MarketplacesController.list)
    .post(MarketplacesController.store)

module.exports = routes;