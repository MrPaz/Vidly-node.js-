const genreRouter = require('../routes/genres');
const customerRouter = require('../routes/customers');
const movieRouter = require('../routes/movies');
const rentalRouter = require('../routes/rentals');
const userRouter = require('../routes/users');
const authRouter = require('../routes/auth');
const returnsRouter = require('../routes/returns');
const error = require('../middleware/error');
const express = require('express');



module.exports = function(app) {
    app.use(express.json());
    app.use('/api/genres', genreRouter);
    app.use('/api/customers', customerRouter);
    app.use('/api/movies', movieRouter);
    app.use('/api/rentals', rentalRouter);
    app.use('/api/users', userRouter);
    app.use('/api/auth', authRouter);    
    app.use('/api/returns', returnsRouter);    
    app.use(error);    
}