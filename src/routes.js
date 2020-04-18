const express = require('express');
var path = require("path");
//const authServer = require('./services/auth-service');

const InstagramController = require('./controllers/InstagramController');
const MercadoLivreController = require('./controllers/MercadoLivreController');
const StepsController = require('./controllers/StepsController');
const ModulesController = require('./controllers/ModulesController');
const UsersController = require('./controllers/UsersController');
const ProgressController = require('./controllers/ProgressController');
const SocialNetworkController = require('./controllers/SocialNetworkController');
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

routes.route('/steps')
    .get(StepsController.index)
    .post(StepsController.store)
/*
routes.get('/steps', StepsController.index);
routes.post('/steps', StepsController.store);*/



routes.route('/modules')
    .get(ModulesController.list)
    .post(ModulesController.store);
routes.get('/modules/:id', ModulesController.index);
/*
routes.get('/modules', ModulesController.list);
routes.post('/modules', ModulesController.store);*/

routes.post('/users', UsersController.store);
routes.get('/login', UsersController.login);


/*
routes.post('/progress', ProgressController.store);
routes.get('/progress', ProgressController.list);*/
routes.route('/progress')
    .get(ProgressController.list)
    .post(ProgressController.store);
routes.get('/progress/:id', ProgressController.index);
routes.get('/progress/user/:user_id', ProgressController.getByUser);
routes.get('/progress/user/:user_id/module/:module_id', ProgressController.getByUserAndModule);

routes.get('/social-networks/:id', SocialNetworkController.index);
routes.get('/social-networks', SocialNetworkController.list);
routes.post('/social-networks', SocialNetworkController.store);

module.exports = routes;