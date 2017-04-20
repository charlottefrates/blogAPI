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

// when requests come into `/blog-post` they get routed to blogPostRouter
//use this to get access to predefined posts stored in postman localhost:3000/blog-post
app.use('/blog-post', blogPostRouter);


//app set to PORT 3000
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT || 3000}`);
});
