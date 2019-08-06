const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
    mongoose.connect('mongodb://localhost/vidly')
        .then(() => winston.info('Connected to MongoDb...')); // got rid of catch block to let global error handler deal with connection issues
}