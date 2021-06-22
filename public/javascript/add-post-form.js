function newFormHandler(event) {
    console.log('click');
    const newPost = $('#new-post-template').html();
    var compiled = Handlebars.compile(newPost);
    $('#add-post-container').html(compiled({}));
  }

  document.querySelector('#add-post-btn').addEventListener('submit', newFormHandler);