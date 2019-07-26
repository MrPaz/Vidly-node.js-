const mongoose = require('mongoose');
const Joi = require('joi');

const Rental = mongoose.model('Rental', new mongoose.Schema({
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 3,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 15
            }
        }),
        required: true
    },
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                require: true,
                minlength: 3,
                maxlength: 25
            },
            isGold: {
                type: Boolean,
                require: true
            },
            phone: {
                type: String,
                require: true,
                minlength: 3,
                maxlength:25
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));

function validateRental(rental) {
    const schema = {
        movieId: Joi.objectId().required(), // only send movie & customer Id's, this should be handled by client, every other part of schema should be set by server
        customerId: Joi.objectId().required()
    };

    return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;
