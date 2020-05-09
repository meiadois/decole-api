var path = require('path');
const express = require('express');
const routes = require('./routes');
const authorized_routes = require('./authorized-routes');
const folders_manager = require('./helpers/folders_manager');
const { handleError, ErrorHandler } = require('./helpers/error');
require('./models');

const app = express();
app.use(express.json());

const public_folder = path.join(__dirname, '..', 'public')
folders_manager.createPublicFolders(public_folder);
const companies_folder = path.join(public_folder, 'companies')
app.use("static/companies/banners", express.static(path.join(companies_folder, 'banners')));
app.use("static/companies/thumbnails", express.static(path.join(companies_folder, 'thumbnails')));

app.use('/v1', routes);
app.use('/v1', authorized_routes);


app.get('/', async function (req, res) {
    res.json({
        "Mensagem": "Seja bem vindo(a)! Para consultar nossas rotas, utilize o INSOMNIA e realize a importação do Workspace contido na pasta /docs do nosso GITHUB."
    })
});

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    }
}
app.get('*', wrapAsync(async function (req, res) {
    //res.status(404).json({message:"Endpoint inexistente."});
    throw new ErrorHandler(404, `${req.originalUrl} não existente.`);
    //await new Promise(resolve => setTimeout(() => resolve(), 50));
}))
app.use(function (err, req, res, next) {
    handleError(err, res);
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
