const express = require('express');
var path = require("path");
//const authServer = require('./services/auth-service');

//const ProductsController = require('./controllers/ProductsController');
const InstagramController = require('./controllers/InstagramController');

const routes = express.Router();
routes.get("/", function (req, res) {
    res.json({
        "Mensagem": "Seja bem vindo a API da equipe MeiaDois!"
    })
})
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

module.exports = routes;