const express = require('express');
var path = require("path");
const SaveImage = require('./services/SaveImage');
const ProcessImage = require('./services/ProcessImage');
const fs = require('fs');
const stream = require('stream');
const resolve = require('path').resolve;

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
const AuthenticationsController = require('./controllers/AuthenticationsController');
const AccountsController = require('./controllers/AccountsController');



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
routes.route('/admin/users/:id')
    .get(UsersController.index)
    .put(UsersController.update)
    .delete(UsersController.delete);


routes.route('/users')
    .get(UsersController.list);


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

routes.post('/login', AuthenticationsController.login);
routes.post('/register', AuthenticationsController.register);
// Accounts
routes.route('/accounts/:id')
    .get(AccountsController.index)
    .put(AccountsController.update)
    .delete(AccountsController.delete);

routes.route('/accounts')
    .get(AccountsController.list)
    .post(AccountsController.store);


// Me Routes

routes.get('/nova-imagem', (req, res, next) => {
    res.send(`
            <html>
                <head> 
                    <title> Nova imagem </title>
                </head>
                </body>
                    <!-- O enctype é de extrema importância! Não funciona sem! -->
                    <form action="/nova-imagem"  method="POST" enctype="multipart/form-data">
                        <!-- O NAME do input deve ser exatamente igual ao especificado na rota -->
                        <input type="file" name="image">
                        <button type="submit"> Enviar </button>
                    </form>
                </body>
            </html>
        `);
});
// ROTA PARA POST, TRATAR O FORMULÁRIO
// APLICAMOS O NOSSO MIDDLEWARE IMPORTADO PASSANDO O NAME DO INPUT A SER TRATADO
routes.post('/nova-imagem', SaveImage.any(), async (req, res, next) => {
    // Se houve sucesso no armazenamento
    // Se houve sucesso no armazenamento
    var thumbnail_path = null;
    var banner_path = null;

    if (req.files) {
        for (var i in req.files) {
            var file = req.files[i];
            var file_path = await ProcessImage.processCompanyThumbnail(file.path)
                .then((file_path) => {
                    return file_path;
                }).catch((err) => {
                    console.log(err)
                    throw err;
                });
            if (file.fieldname == 'thumbnail') {
                thumbnail_path = file_path
            } else {
                if (file.fieldname == 'banner') {
                    banner_path = file_path
                }
            }
        }
        var message = [];
        if (thumbnail_path) {
            message.push({
                'message': "Thumbnail adicionada com sucesso!",
                'path': thumbnail_path
            });
        }
        if (banner_path) {
            message.push({
                'message': "Banner adicionado com sucesso!",
                'path': banner_path
            });
        }
        return res.json(message);
    } else {
        return res.send('Não há imagens!');
    }
});

// TODO Seguir implementando
routes.get("/pegar-imagem", (req, res, nex) => {
    const full_path = resolve('.\public\images\1588102139001-anormal_no_covid3.webp');
    console.log(full_path)
    //return res.sendFile('./public/images/1588102139001-anormal_no_covid3.webp');
    const r = fs.createReadStream(full_path) // or any other way to get a readable stream
    const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
    stream.pipeline(
        r,
        ps, // <---- this makes a trick with stream error handling
        (err) => {
            if (err) {
                console.log(err) // No such file or any other kind of error
                return res.sendStatus(400);
            }
        })
    ps.pipe(res) // <---- this makes a trick with stream error handling
})
module.exports = routes;