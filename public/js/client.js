//global variable
var title, content, author;

//variable that holds blog entries
var data = { };

//API POST request
var newBlogEntry    = {
                         "url": "http://localhost:3000/blog-post",
                         "method": "POST",
                         "data":JSON.stringify(data)
                    };

$('#submit').on('click', function(){
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
          response.forEach(function(blog_entry){

           var blogTemplate = `
              <h1 class="blog-title">${title}</h1>
              <p class="lead">by <a href="#">${author}</a></p>
              <hr>
              <p class="blog-content lead">${content}</p>`;

           console.log(blog_entry);
           $('#blogposts').prepend(blogTemplate);
           console.log ('blog entry added');
          });
     });

});




$(document).ready(function () {

     /*this script displays a greeting to the user based upon current time*/

      var   today= new Date(); //Date object
      var   hourNow= today.getHours(); //Find current hour
      var   greeting;

     //Display the right greeting based on current time

     if (hourNow>18) {greeting=" Good evening";}
     else if (hourNow >12) {greeting="Good afternoon";}
     else if (hourNow >0) {greeting="Good morning";}
     else{greeting="Welcome Dude"}

     alert(greeting);

     /*t-------Event handlers on load------------------------------------*/

     $('#new').on('click',function (){
          $('#blogposts').addClass('hidden');
          $('#entry').removeClass('hidden');
     });

     $('#home').on('click',function (){
          $('#blogposts').removeClass('hidden');
          $('#entry').addClass('hidden');
     });


});


/*





*/
