const express = require('express');
const app = express();
const winston = require('winston');

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')(); // returns a function so must call it.
require('./startup/config')();
require('./startup/validation')();

const port = process.env.port || 5000;

const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;

//////////////////////////////////////////////////////////////////////////
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