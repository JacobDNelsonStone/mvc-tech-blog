const commentFormHandler = async function(event) {
  event.preventDefault();
  console.log('clicked')
  const postId = document.querySelector('data-id').value;
  const comment = document.querySelector('input[name="comment-body"]').value;

  console.log(postId);
  console.log(comment);

  if (body) {
    await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        comment
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    document.location.reload();
  }
};

document
  .querySelector('#commentButton')
  .addEventListener('click', commentFormHandler);
