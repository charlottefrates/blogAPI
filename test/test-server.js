const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

// this lets us use *should* style syntax in our tests
// so we can do things like `(1 + 1).should.equal(2);`
// http://chaijs.com/api/bdd/
const should = chai.should();

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);


describe('BlogPosts', function() {

  // Before our tests run, we activate the server. Our `runServer`
  // function returns a promise, and we return the that promise by
  // doing `return runServer`. If we didn't return a promise here,
  // there's a possibility of a race condition where our tests start
  // running before our server has started.
  before(function() {
    return runServer();
  });

  // although we only have one test module at the moment, we'll
  // close our server at the end of these tests. Otherwise,
  // if we add another test module that also has a `before` block
  // that starts our server, it will cause an error because the
  // server would still be running from the previous tests.
  after(function() {
    return closeServer();
  });

  // test strategy:
  //   1. make request to `/blog-post`
  //   2. inspect response object and prove has right code and have
  //   right keys in response object.
  it('should list items on GET', function() {
    // for Mocha tests, when we're dealing with asynchronous operations,
    // we must either return a Promise object or else call a `done` callback
    // at the end of the test. The `chai.request(server).get...` call is asynchronous
    // and returns a Promise, so we just return it.
    return chai.request(app)
      .get('/blog-post')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');

        // because we create three items on app load
        res.body.length.should.be.at.least(1);
        // each item should be an object with key/value pairs
        // for `id`, `name` and `checked`.
        const expectedKeys = ['id', 'title', 'content','author'];
        res.body.forEach(function(item) {
          item.should.be.a('object');
          item.should.include.keys(expectedKeys);
        });
      });
  });

  // test strategy:
  //  1. make a POST request with data for a new item
  //  2. inspect response object and prove it has right
  //  status code and that the returned object has an `id`
  it('should add a blog post on POST', function(done) {
    const newPost = { title: 'Some Title', content: 'Some Content', author: 'Charlotte Frates'};
    //identifies additional response
    const expectedKeys = ['id', 'publishDate'].concat(Object.keys(newPost));

    chai.request(app)
      .post('/blog-posts')
      .send(newPost)
      .end(function(err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.all.keys(expectedKeys);
        res.body.title.should.equal(newPost.title);
        res.body.content.should.equal(newPost.content);
        res.body.author.should.equal(newPost.author)
      });
      done();
  });

  it('should error if POST missing expected values', function(done) {
    const badRequestData = {};
    chai.request(app)
      .post('/blog-posts')
      .send(badRequestData)
      .end(function(err, res) {
        res.should.have.status(400);
      })
    done();
  });

  // test strategy:
  //  1. initialize some update data (we won't have an `id` yet)
  //  2. make a GET request so we can get an item to update
  //  3. add the `id` to `updateData`
  //  4. Make a PUT request with `updateData`
  //  5. Inspect the response object to ensure it
  //  has right status code and that we get back an updated
  //  item with the right data in it.
  it('should update blog posts on PUT', function(done) {

   chai.request(app)
     // first have to get
     .get('/blog-posts')
     .end(function(err, res) {
       const updatedPost = Object.assign(res.body[0], {
         title: 'Some Title',
         content: 'Some content'
       });
       chai.request(app)
         .put(`/blog-posts/${res.body.id}`)
         .send(updatedPost)
         .end(function(err, res) {
           res.should.have.status(204);
           res.should.be.json;
         });
     })
     done();
 });

  // test strategy:
  //  1. GET a shopping list items so we can get ID of one
  //  to delete.
  //  2. DELETE an item and ensure we get back a status 204
  it('should delete posts on DELETE', function(done) {
      chai.request(app)
        // first have to get
        .get('/blog-posts')
        .end(function(err, res) {
          chai.request(app)
            .delete(`/blog-posts/${res.body.id}`)
            .end(function(err, res) {
              res.should.have.status(204);
            });
        })
        done();
    });

  });
