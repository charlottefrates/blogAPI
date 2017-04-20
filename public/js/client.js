function PostBlog() {
  $.getJSON('/blog-posts', function(blogPosts) {
    console.log(blogPosts);

    blogPosts.forEach(function(blog_entry){
      var blogTemplate = `
      <article class="blog-entry">
        <h1 class="blog-title">${blog_entry.title}</h1>
        <p class="lead">by <a href="#">${blog_entry.author}</a></p>
        <hr>
        <p class="blog-content lead">${blog_entry.content}</p>
      </article>`;
      console.log(blog_entry);
      $('#blogposts').append(blogTemplate);
      console.log ('blog entry appended');
    });
  });
}

PostBlog();
