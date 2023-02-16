const Joi = require('joi');

exports.newFilmValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(250).required(),
        directors: Joi.string(), 
        geners: Joi.string(), 
        countries: Joi.string(), 
        year: Joi.number().integer().min(1900).max(2023).required(),
        description: Joi.string().min(20).max(450).required(),
        type: Joi.any().allow('movie', 'tvSeries'),
    })

    return schema.validate(data)
}
