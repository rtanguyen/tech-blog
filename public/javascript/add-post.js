async function addPost(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('textarea[name="post-content"]').value;
    var newPostContainerEL = document.querySelector('#new-post-container');
    var dashboardContainerEl = document.querySelector('#dashboard-container')

    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  console.log(response);
    if (response.ok) {
      document.location.replace('/dashboard');
      newPostContainerEL.classList.add('hide');
      dashboardContainerEl.classList.remove('hide');
    } else {
      alert(response.statusText);
    }
  }
  document.querySelector('#new-post-form').addEventListener('submit', addPost);
  

//display add post html, hide posts 
function newFormHandler(event) {
  console.log('hi');
  var newPostContainerEL = document.querySelector('#new-post-container');
  var dashboardContainerEl = document.querySelector('#dashboard-container')
  // var addBtnEl = document.querySelector('#add-post-btn');
  
  newPostContainerEL.classList.remove('hide');
  dashboardContainerEl.classList.add('hide');
  // addBtnEl.classList.add('hide');
}
  document.querySelector('#add-post-btn').addEventListener('click', newFormHandler)



