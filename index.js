require('express-async-errors');
const express = require('express');
const genreRouter = require('./routes/genres');
const customerRouter = require('./routes/customers');
const movieRouter = require('./routes/movies');
const rentalRouter = require('./routes/rentals');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');
const error = require('./middleware/error');
const winston = require('winston');

winston.add(new winston.transports.Console());
winston.add(new winston.transports.File({ filename: 'logfile.log' }));

if (!config.get('jwtPrivateKey')) {
    console.error('Fatal Error: jwtPrivateKey is not defined.');
    process.exit(1);
}

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDb...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));

const app = express();

app.use(express.json());
app.use('/api/genres', genreRouter);
app.use('/api/customers', customerRouter);
app.use('/api/movies', movieRouter);
app.use('/api/rentals', rentalRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.use(error);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...`));

// // Async example
// console.log('Before');
// getUser(1, (user) => {
//     console.log('User', user);

//     getRepositories(user.githubUsername, (repos) => {
//         console.log('Repos', repos)
//     });

// });
// console.log('After');

// function getUser(id, callback) {
//     setTimeout(() => {
//         console.log('Reading user from the database...');
//         callback({id: id, githubUsername: 'paz'});
//     }, 2000);
// }

// function getRepositories(username, callback) {
//     setTimeout(() => {
//         console.log('Calling GitHub API...');
//         callback(['repo1', 'repo2', 'repo3']);
//     }, 2000);
// }

// // Promise example
// const p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve('paz');
//         reject(new Error('error message'));
//     }, 2000);
// }); 

// p   
//     .then(result => console.log('Result:', result))
//     .catch(err => console.log('Error:', err.message));

// // Async / Await exercise
// async function getCustomerAsync() {
//     try{
//         const customer = await getCustomer(1);
//         console.log('Customer:', customer);
//         if (customer.isGold){
//             const movies = await getTopMovies(customer);
//             console.log('Top movies: ', movies);
//             await sendEmail(customer.email, getTopMovies)
//             console.log('Sending email...');
//         }
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// getCustomerAsync();

// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if (customer.isGold) {
//       getTopMovies((movies) => {
//         console.log('Top movies: ', movies);
//         sendEmail(customer.email, movies, () => {
//           console.log('Email sent...')
//         });
//       });
//     }
//   });
  
//   function getCustomer(id) {
//       return new Promise((resolve, reject) => {
//           setTimeout(() => {
//             resolve({ 
//               id: 1, 
//               name: 'Mosh Hamedani', 
//               isGold: true, 
//               email: 'email' 
//             });
//           }, 4000);           
//       });
//   }
  
//   function getTopMovies() {
//       return new Promise((resolve, reject) => {
//           setTimeout(() => {
//             resolve(['movie1', 'movie2']);
//           }, 4000);
//       });
//   }
  
//   function sendEmail(email, movies) {
//       return new Promise((resolve, reject) => {
//           setTimeout(() => {
//             resolve();
//           }, 4000);
//       });
//   }