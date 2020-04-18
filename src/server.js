const express = require('express');
const routes = require('./routes');
//require('./models');
const app = express();
app.use(express.json());
app.use('/v1', routes);
app.get('/', (req, res) => {
    res.json({
        "Mensagem": "Seja bem vindo(a)! Para consultar nossas rotas, utilize o INSOMNIA e realize a importação do Workspace contido na pasta /docs do nosso GITHUB."
    })
})
/*
app.get("/", function (req, res) {
    res.json({
        "Mensagem": "Seja bem vindo a API da equipe MeiaDois!"
    });
})*/


app.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
