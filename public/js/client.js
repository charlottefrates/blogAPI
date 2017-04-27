//global variable
var title, content, author;

//variable that holds blog entries
var data = {};

//Captures original API preset posts
var preSetPosts = {};

// API GET reqeust
var firstRequest = {
     "url": "http://localhost:3000/blog-post",
     "dataType": "json",
     "contentType": "application/json; charset=utf-8",
     "method": "GET",
};

//API POST request
var newBlogEntry = {
     "url": "http://localhost:3000/blog-post",
     "dataType": "json",
     "contentType": "application/json; charset=utf-8",
     "method": "POST",
     "data": JSON.stringify(data)
};

//API DELETE request
var deleteBlogEntry = {
    "url": "http://localhost:3000/blog-post/:id",
    "dataType": "json",
    "contentType": "application/json; charset=utf-8",
    "method": "DELETE",
}


//Renders Blog Posts into DOM
function showPosts() {
     $.each(preSetPosts, function(index, value) {
          console.log(value.title);
          console.log(value.content);
          console.log(value.author);

          var blogTemplate = '<h1 class="blog-title">' +
               value.title +
               '</h1>' +
               '<p class="lead">by <a href="#">' +
               value.author +
               '</a></p>' +
               '<hr>' +
               '<p class="blog-content lead">' +
               value.content +
               '</p>';

          $('#blogposts').append(blogTemplate);;

     });

}

//Renders Blog TITLES into DOM
function showTitle() {
     $.each(preSetPosts, function(index, value) {
          console.log(value.title);

          var blogTemplate = '<h1 class="blog-title">'
               + value.title
               +'</h1>'
               + '<button id="delete"type="submit" class="btn btn-primary" style="margin-right:10px;">'
               + 'Delete'
               + '</button>'
               + '<button id="edit"type="submit" class="btn btn-primary style="margin-right:10px;">'
               + 'Edit'
               + '</button>'
               + '<hr>';

          $('#listtitle').append(blogTemplate);;

     });

}

// Selects ids to be DELETED from Blog entries
function deletePost() {
    console.log(preSetPosts);
    //select entry in preSetPosts to be deleted
    // TODO: var entrySelection = element.closest('h1').attr('index');
    // TODO: console.log(entrySelection);

    //Take selection and input id number into DELETE reqeust
    // TODO: deleteBlogEntry.url = "http://localhost:3000/blog-post/" + ${id}

    //update reqeust into JSON stringify
    //TODO: deleteBlogEntry.url = JSON.stringify(); TODO

}



// POST new blog entry
$('#submit').on('click', function(event) {
     event.preventDefault();
     // updates global variables based on user input
     title = $('#title').val();
     content = $('#content').val();
     author = $('#author').val();

     console.log(title);
     console.log(content);
     console.log(author);

     // captures newlines/line breaks
     content = content.replace(/\n/g, "<br/>");

     // updates text variable with user inputted text
     data.title = title;
     data.content = content;
     data.author = author;

     //updates data variable into JSON string
     newBlogEntry.data = JSON.stringify(data);

     console.log(data);

     $.ajax(newBlogEntry).done(function(response) {
          console.log(response);
     });

});


// GET current blog entries
$('#home').on('click', function(event) {
     event.preventDefault();
     $('#editposts').addClass('hidden');
     $("#blogposts").empty();

     $.ajax(firstRequest).done(function(response) {
          //updates preSetPosts with any new additional posts
          preSetPosts = eval(response);
          console.log(preSetPosts);
          showPosts();
     });


});

// GET titles of current blog entries
$('#edit').on('click', function(event){
     event.preventDefault();

     $('#editposts').removeClass('hidden');
     $('#blogposts').addClass('hidden');
     $('#entry').addClass('hidden');
     $("#listtitle").empty();

     $.ajax(firstRequest).done(function(response) {
          //updates preSetPosts with any new additional posts
          preSetPosts = eval(response);
          console.log(preSetPosts);
          showTitle();
     });

});

// DELETE blog entry
$('#delete').on('click', function(){
    deletePost();
    //TODO:  $.ajax(deleteBlogEntry).done(function(response) {console.log(response);});
});

//document load
$(document).ready(function() {

     $.ajax(firstRequest).done(function(response) {
          //updates preSetPosts with any new additional posts
          preSetPosts = eval(response);
          console.log(preSetPosts);
          showPosts();
     });

     $('#new').on('click', function() {
          $('#blogposts').addClass('hidden');
          $('#entry').removeClass('hidden');

     });

     $('#home').on('click', function() {
          $('#blogposts').removeClass('hidden');
          $('#entry').addClass('hidden');
     });



});
