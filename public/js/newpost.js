
const newPostSection = document.querySelector('.newpost');

const showNewPost = (e) => {
  e.preventDefault();
  console.log('clicked');

  newPostSection.classList.remove("hidden");
}

const newPostHandler = async (event) => {
  event.preventDefault();
  console.log('clicked');

  const title = document.querySelector('#post-title').value;
  const message = document.querySelector('#post-message').value;
  const postDate = new Date
  await fetch(`/api/newpost`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      message,
      postDate
      
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  document.location.reload();
}

document
  .querySelector('.createPostButton')
  .addEventListener('click', newPostHandler);

document
  .querySelector('#newPostTag')
  .addEventListener('click', showNewPost);