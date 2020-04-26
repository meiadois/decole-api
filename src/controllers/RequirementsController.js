const database = require('../models');
const Requirement = database.Requirement;
const Lesson = database.Lesson;
const Step = database.Step;

const { ErrorHandler } = require('../helpers/error');

module.exports = {
    async list(req, res, next) {
        try{
            const _requirements = await Requirement.findAll({
                include: [
                    { 
                        association: 'required_lesson'
                    },
                    { 
                        association: 'required_step'
                    },
                ]
            });
            res.json(_requirements);
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
            var _requirement = null;
            try {
                _requirement = await Requirement.findByPk(id, {
                    include: [
                        { 
                            association: 'required_lesson'
                        },
                        { 
                            association: 'required_step'
                        },
                    ]
                });
            } catch (err) {
                console.log(err)
            }
            
            if(_requirement === null){
                throw new ErrorHandler(404, null);
            }
            return res.status(200).json(_requirement);
        }catch(err){
            next(err);
        }
        
    },
    async store(req, res, next) {
        try{
            var { lesson_id, required_lesson_id, step_order } = req.body;
            if(!lesson_id || !required_lesson_id || !step_order){
                throw new ErrorHandler(400, null);
            }
            
            const lesson = await Lesson.findByPk(lesson_id);

            if(!lesson){
                throw new ErrorHandler(404, null);
            }

            const required_lesson = await Lesson.findByPk(required_lesson_id);

            if(!required_lesson){
                throw new ErrorHandler(404, null);
            }

            const step = await Step.findOne({where:{'lesson_id':required_lesson_id, 'order':step_order}});

            if(!step){
                throw new ErrorHandler(404, null);
            }

            const _requirement = await Requirement.create({
                lesson_id,
                required_lesson_id,
                'required_step_id':step.id
            }).then((result) => result)
            .catch((err) => {
                console.log(err);
                return null;
            });
            if(!_requirement){
                throw new ErrorHandler(500, null);
            }
            
            /*
            _requirement.setStep(step).catch((err) => {
                console.log(err);
            });

            _requirement.setLesson(lesson).catch((err) => {
                console.log(err);
            });*/
            
            return res.status(201).json(_requirement);
        }catch(err){
            next(err);
        }
    },
    async update (req, res, next) {
        try{
            var { id } = req.params;
            var { lesson_id, required_lesson_id, step_order } = req.body;
            if(!lesson_id || !required_lesson_id || !step_order){
                throw new ErrorHandler(400, null);
            }
    
            const _requirement = await Requirement.findByPk(id);
    
            if(!_requirement){
                throw new ErrorHandler(404, null);
            }
            
            const step = await Step.findOne({where:{'lesson_id':required_lesson_id, 'order':step_order}});

            if(!step){
                throw new ErrorHandler(404, null);
            }
            
            _requirement.lesson_id = lesson_id;
            _requirement.required_lesson_id = required_lesson_id;
            _requirement.required_step_id = step.id;

            var _success = await _requirement.save().then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });
    
            if(!_success){
                throw new ErrorHandler(500, null);
            }
            return res.status(200).json(_requirement);    
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
    
            const _requirement = await Requirement.findByPk(id);
    
            if(!_requirement){
                throw new ErrorHandler(404, null);
            }
    
            var _success = await _requirement.destroy().then(() => {
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