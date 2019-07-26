const express = require('express');
const router = express.Router();
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');

router.get('', async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
});

router.get('/:id', async (req, res) => {
    const Movie = await Movie.findById(req.params.id);
    
    if (!Movie) return res.status(404).send('Movie provided not found');

    res.send(Movie);
});

router.post('', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Invalid genre: genre not found.');

    let newMovie = Movie({
        title: req.body.title,
        genre: {
            _id: genre._id, 
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    newMovie = await newMovie.save();

    res.send(newMovie);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Invalid genre: genre not found.');

    let movie = await Movie.findByIdAndUpdate(req.params.id, 
        {
            title: req.body.title,
            genre: {
                _id: genre._id, 
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        },
        { new: true }
    );

    if (!movie) return res.status(404).send('Movie provided not found');
    
    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const Movie = await Movie.findByIdAndRemove(req.params.id);

    if (!Movie) return res.status(404).send('Movie provided not found');
    
    res.send(Movie);
});

module.exports = router;