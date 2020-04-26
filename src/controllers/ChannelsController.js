const database = require('../models')
const Channel = database.Channel
const { ErrorHandler } = require('../helpers/error');

module.exports = {
    async list(req, res, next) {
        try{
            const _channels = await Channel.findAll();
            res.json(_channels);
        }catch(err){
            next(err);
        }
    },
    async index(req, res, next) {
        try{
            var { id } = req.params;

            if(!id){
                throw new ErrorHandler(404, null);
            }
            var _channel = null;
            try {
                _channel = await Channel.findByPk(id);
            } catch (err) {
                console.log(err)
            }
    
            if(_channel === null){
                throw new ErrorHandler(404, null);
            }
            return res.status(200).json(_channel);
        }catch(err){
            next(err);
        }
        
    },
    async store(req, res, next) {
        try{
            var { name, category } = req.body;
            if(!name || !category){
                throw new ErrorHandler(400, null);
            }
    
            const [_channel] = await Channel.findOrCreate({
                where: { name, category }
            }).catch((err) => {
                console.log(err);
                return null;
            });
            if(!_channel){
                throw new ErrorHandler(500, null);
            }
            return res.status(201).json(_channel);
        }catch(err){
            next(err);
        }
    },
    async update (req, res, next) {
        try{
            var { id } = req.params;
            var { name, category } = req.body;
            if(!name || !category){
                throw new ErrorHandler(400, null);
            }
    
            const _channel = await Channel.findByPk(id);
    
            if(!_channel){
                throw new ErrorHandler(404, null);
            }
    
            _channel.name = name;
            _channel.category = category;
    
    
            var _success = await _channel.save().then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });
    
            if(!_success){
                throw new ErrorHandler(500, null);
            }
            return res.status(200).json(_channel);    
        }catch(err){
            next(err);
        }
        
    },
    async delete (req, res, next) {
        try{
            var { id } = req.params;
            if(!id){
                throw new ErrorHandler(400, null);
            }
    
            const _channel = await Channel.findByPk(id);
    
            if(!_channel){
                throw new ErrorHandler(404, null);
            }
    
            var _success = await _channel.destroy().then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });
    
            if(!_success){
                throw new ErrorHandler(500, null);
            }
            return res.status(204).json({});
            
        }catch(err){
            next(err);
        }
    },
    
};