const express = require('express');
const routes = require('./routes');
const { handleError, ErrorHandler } = require('./helpers/error');
require('./models');
const app = express();
app.use(express.json());



app.use('/v1', routes);
app.get('/', wrapAsync(async function (req, res){
    throw new ErrorHandler(404, null);
    res.json({
        "Mensagem": "Seja bem vindo(a)! Para consultar nossas rotas, utilize o INSOMNIA e realize a importação do Workspace contido na pasta /docs do nosso GITHUB."
    })
}));


function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(next);
    }
}
app.get('*', wrapAsync(async function(req, res) {
    await new Promise(resolve => setTimeout(() => resolve(), 50));
}))
app.use(function (err, req, res, next) {
    handleError(err, res);
});


app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
