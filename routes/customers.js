const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');

router.get('', async (req, res) => {
    const customers = await Customer.find();

    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('Customer provided not found.');

    res.send(customer);
});

router.post('', async (req, res) => {
    // const validate = validateCustomer(req.body);
    // if (validate.error) return res.status(404).send(validate.error.details[0].message);

    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let newCustomer = Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });

    newCustomer = await newCustomer.save();

    res.send(newCustomer);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    
    const customer = await Customer.findByIdAndUpdate(req.params.id, 
        {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone   
        },
        { new: true } // returns updated customer object, if not used, res.send(customer) shows old data from before update
    );
    
    if (!customer) res.status(404).send('Customer provided not found');

    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) res.status(404).send('Customer provided not found');

    res.send(customer);
});

module.exports = router;