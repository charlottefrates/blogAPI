//global variable
var title, content, author;

//variable that holds blog entries
var data = { };

// API get reqeust
var firstRequest = {
                              "url": "http://localhost:3000/blog-post",
                              "dataType": "json",
                              "contentType":"application/json; charset=utf-8",
                              "method": "GET",
                         };


//API POST request
var newBlogEntry    = {
                         "url": "http://localhost:3000/blog-post",
                         "dataType": "json",
                         "contentType":"application/json; charset=utf-8",
                         "method": "POST",
                         "data":JSON.stringify(data)
                    };
//Captures original API preset posts
var preSetPosts = { };

//Renders Posts into DOM
function showPosts(){
     $.each(preSetPosts, function (index, value) {
          console.log(value.title);
          console.log(value.content);
          console.log(value.author);

          var blogTemplate = '<h1 class="blog-title">'
                              + value.title
                              + '</h1>'
                              + '<p class="lead">by <a href="#">'
                              + value.author
                              + '</a></p>'
                              + '<hr>'
                              + '<p class="blog-content lead">'
                              + value.content
                              + '</p>';

          $('#blogposts').append(blogTemplate);;

     });

}



$('#submit').on('click', function(event){
     event.preventDefault();

     // updates global variables based on user input
     title = $('#title').val();
     content = $('#content').val();
     author = $('#author').val();

     console.log(title);
     console.log(content);
     console.log(author);

     // updates text variable with user inputted text
     data.title = title;
     data.content = content;
     data.author = author;

     //updates data variable into JSON string
     newBlogEntry.data = JSON.stringify(data);

     console.log(data);

     $.ajax(newBlogEntry).done(function (response) {
          console.log(response);
     });

});

$('#home').on('click', function(event){
     event.preventDefault();
     $("#blogposts").empty();

     $.ajax(firstRequest).done(function (response) {
          //updates preSetPosts with any new additional posts
          preSetPosts = eval(response);
          console.log (preSetPosts);
          showPosts();
          });


});




$(document).ready(function () {

     $.ajax(firstRequest).done(function (response) {
          //updates preSetPosts with any new additional posts
          preSetPosts = eval(response);
          console.log (preSetPosts);
          showPosts();
          });

     $('#new').on('click',function (){
          $('#blogposts').addClass('hidden');
          $('#entry').removeClass('hidden');
     });

     $('#home').on('click',function (){
          $('#blogposts').removeClass('hidden');
          $('#entry').addClass('hidden');
     });


});
