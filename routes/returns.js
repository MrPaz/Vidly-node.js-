const express = require('express');
const router = express.Router();
const { Rental } = require('../models/rental');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    if (!req.body.customerId)
        return res.status(400).send('Must provide customerId');

    if (!req.body.movieId)
        return res.status(400).send('Must provide movieId');

    const rental = await Rental
        .findOne({
            'customer._id': req.body.customerId,
            'movie._id': req.body.movieId   
        });

    if (!rental) return res.status(404).send('Rental not found');

    if (rental.dateReturned) return res.status(400).send('Rental already returned');

    rental.dateReturned = new Date();
    await rental.save();

    return res.status(200).send('OK');
});


module.exports = router;