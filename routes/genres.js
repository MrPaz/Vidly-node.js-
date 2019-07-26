const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../models/genre');

router.get('', async (req, res) => {
    const genres = await Genre.find();
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    
    if (!genre) return res.status(404).send('Genre provided not found');

    res.send(genre);
});

router.post('', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let newGenre = Genre({
        name: req.body.name
    });

    newGenre = await newGenre.save();

    res.send(newGenre);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = await Genre.findByIdAndUpdate(req.params.id, 
        { name: req.body.name }, 
        { new: true }
    );

    if (!genre) return res.status(404).send('Genre provided not found');
    
    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('Genre provided not found');
    
    res.send(genre);
});

module.exports = router;