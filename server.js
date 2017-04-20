'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();

//
const blogPostRouter = require('./blogPostRouter');


// log the http layer
app.use(morgan('common'));

// loads static resources
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


// when requests come into `/blog-post` or
//we'll route them to the express
// router instances we've imported. Remember,
// these router instances act as modular, mini-express apps.
// any request to /blog-post should be routed to the blogPostRouter
app.use('/blog-post', blogPostRouter);


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT || 3000}`);
});
