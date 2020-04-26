const database = require('../models')
const Segment = database.Segment
const {  ErrorHandler } = require('../helpers/error');

module.exports = {
    async list(req, res, next) {
        try{
            const _segments = await Segment.findAll();
            res.json(_segments);
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
            var _segment = null;
            try {
                _segment = await Segment.findByPk(id);
            } catch (err) {
                console.log(err)
            }
    
            if(_segment === null){
                throw new ErrorHandler(404, null);
            }
            return res.status(200).json(_segment);
        }catch(err){
            next(err);
        }
        
    },
    async store(req, res, next) {
        try{
            var { name } = req.body;
            if(!name){
                throw new ErrorHandler(400, null);
            }
    
            const [_segment] = await Segment.findOrCreate({
                where: { name }
            }).catch((err) => {
                console.log(err);
                return null;
            });
            if(!_segment){
                throw new ErrorHandler(500, null);
            }
            return res.status(201).json(_segment);
        }catch(err){
            next(err);
        }
    },
    async update (req, res, next) {
        try{
            var { id } = req.params;
            var { name } = req.body;
            
            if(!id || !name){
                throw new ErrorHandler(400, null);
            }
    
            const _segment = await Segment.findByPk(id);
    
            if(!_segment){
                throw new ErrorHandler(404, null);
            }
    
            _segment.name = name;
    
    
            var _success = await _segment.save().then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });
    
            if(!_success){
                throw new ErrorHandler(500, null);
            }
            return res.status(200).json(_segment);    
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
    
            const _segment = await Segment.findByPk(id);
    
            if(!_segment){
                throw new ErrorHandler(404, null);
            }
    
            var _success = await _segment.destroy().then(() => {
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