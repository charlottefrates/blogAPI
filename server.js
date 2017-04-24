//strict mode prevents undeclared variables
//allows for better handling becuase it catches bad syntax as well
'use strict';

//'require' used to import third party libraries

// this variable imports express
const express = require('express');

// this variable imports morgan
//go-to HTTP logging middleware for Express apps.
//With a few lines of setup code, we can use Morgan to get nicely formatted, standardized logs of all requests made to our server
const morgan = require('morgan');

//the constant 'app' calls for 'express()'
const app = express();

//constant that imports modularized route
const blogPostRouter = require('./blogPostRouter');

// app logs the http layer
app.use(morgan('common'));

// loads static resources
app.use(express.static('public'));

// endpoint request that transfers files from a given path
// res.send method just prints out whatever you put in parenthesis onto the screen
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

//router instances
//router instances act as modular, mini-express apps
// when requests come into `/blog-post` they get routed to blogPostRouter
//use this to get access to predefined posts stored in postman localhost:3000/blog-post
app.use('/blog-post', blogPostRouter);


//Original server designation
//app set to PORT 3000
//app.listen(process.env.PORT || 3000, () => {
//  console.log(`Server is listening on port ${process.env.PORT || 3000}`);
//});

// both runServer and closeServer need to access the same
// server object, so we declare `server` here, and then when
// runServer runs, it assigns a value.
let server;

// this function starts our server and returns a Promise.
// In our test code, we need a way of asynchronously starting
// our server, since we'll be dealing with promises there.
function runServer() {
  const port = process.env.PORT || 3000;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

// like `runServer`, this function also needs to return a promise.
// `server.close` does not return a promise on its own, so we manually
// create one.
function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
