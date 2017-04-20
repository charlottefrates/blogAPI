'use strict';

const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

// added blog posts with these params:title, content, author,
BlogPosts.create(
     'The Fox vs The Dog',
     'The quick brown fox jumps over the lazy dog.English-language pangram—a sentence that contains all of the letters of the alphabet. It is commonly used for touch-typing practice, testing typewriters and computer keyboards, displaying examples of fonts, and other applications involving text where the use of all letters in the alphabet is desired. Owing to its brevity and coherence, it has become widely known.',
     'Charlotte Frates'
);
BlogPosts.create(
     'ETAOIN SHRDLU',
     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, dolor quis. Sunt, ut, explicabo, aliquam tenetur ratione tempore quidem voluptates cupiditate voluptas illo saepe quaerat numquam recusandae? Qui, necessitatibus, est!',
     'Charlotte Frates'
);


// when the root of this router is called with GET, return
// all current blog posts
router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});


// when a new blog is posted, make sure it's
// got required fields (title', 'content','author'). if not,
// log an error and return a 400 status code. if okay,
// add new item to BlogPosts and return it with a 201.
router.post('/', jsonParser, (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = ['title', 'content','author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `The \`${field}\` is missing in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(item);
});


// when DELETE request comes in with an id in path,
router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog entry \`${req.params.ID}\``);
  res.status(204).end();
});

// when PUT request comes in with updated item, ensure has
// required fields. also ensure that item id in url path, and
// item id in updated item object match. if problems with any
// of that, log error and send back status code 400. otherwise
// call `BlogPosts.update` with updated item.
router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content','author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    //checking is recquired field is in the reqeust
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  //checking if the ids are matching
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }


  console.log(`Updating blog entry \`${req.params.id}\``);

  const updatedBlog = BlogPosts.update({
    id: req.params.id,
    author: req.body.author,
    title: req.body.title,
    content: req.body.content
  });
  res.status(204).json(updatedBlog);
})

module.exports = router;
