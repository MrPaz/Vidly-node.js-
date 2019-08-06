const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
    // process.on('uncaughtException', (ex) => {
    //     console.log('We got an Uncaught Exception.');
    //     winston.error(ex.message, ex);
    //     process.exit(1);
    // });

    // process.on('unhandledRejection', (ex) => {
    //     console.log('We got an Unhandled Promise Rejection.');
    //     winston.error(ex.message, ex);
    //     process.exit(1);
    // });

    winston.exceptions.handle(
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
        new winston.transports.Console({ colorize: true, prettyPrint: true }));

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    winston.add(new winston.transports.Console());
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly', level: 'info' }));
    // winston.createLogger({
    //     transports: [
    //         new winston.transports.Console(),
    //         new winston.transports.File({ filename: 'logfile.log'}),
    //         new winston.transports.MongoDB({db: 'mongodb://localhost/vidly'})
    //     ]
    // })

    // throw new Error('Something failed during startup. '); // test startup error handling
    // let p = Promise.reject(new Error('Something failed. Promise rejected. ')); // test unhandled promise errors
    // p.then(() => console.log('Done.')); // no .catch(...) statement
}