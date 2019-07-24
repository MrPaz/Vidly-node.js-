const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', mongoose.Schema({ // simply putting schema def as model arg, rather than defining it it's own variable as done in genre.js
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
}));

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(3).max(25).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.string().min(3).max(25).required()
    };

    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;