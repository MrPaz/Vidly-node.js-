const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 50
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 15
    }
}));

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(3).max(255).required(),
        genreId: Joi.objectId().required(),  // note genreId here. this is what client sends to api. this can be independent of persistence model defined above
        numberInStock: Joi.number().min(0).max(50).required(),
        dailyRentalRate: Joi.number().min(0).max(15).required()
    };

    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;