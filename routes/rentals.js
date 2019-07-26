const express = require('express');
const router = express.Router();
const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const Fawn = require('fawn');
const mongoose = require('mongoose');

Fawn.init(mongoose);

router.get('', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    
    if (!rental) return res.status(404).send('Rental provided not found.');

    res.send(rental);
});

router.post('', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(404).send('Invalid rental: customer not found.');
    
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(404).send('Invalid rental: movie not found.');

    if (movie.numberInStock === 0) return res.send(400).send('Movie not in stock.');

    const newRental = Rental({
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        }
    });

    try {
        new Fawn.Task()
            .save('rentals', newRental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();

        res.send(newRental);
    }
    catch(exception) {
        res.status(500).send('Something failed.');
    }
});

module.exports = router;