const express = require('express');
const router = express.Router();
const { Rental } = require('../../models/rental');

router.post('/', async (req, res) => {
    if (!req.body.customerId)
        return res.status(400).send('Must provide customerId');
    if (!req.body.movieId)
        return res.status(400).send('Must provide movieId');
    const rental = Rental.findOne({movieId: req.body.movieId, customerId: req.body.customerId});
    if (!rental ) return res.status(404).send('Rental not found');
    
    res.status(401).send('Unauthorized');
});


module.exports = router;