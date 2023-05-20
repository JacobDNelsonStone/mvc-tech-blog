const commentFormHandler = async function(event) {
  event.preventDefault();
  console.log('clicked');
  const buttonId = event.target.dataset.id

  console.log(buttonId);

  const postIdDiv = document.querySelector('#postId');
  const comment = event.target.parentElement.parentElement.children[1].value;

  console.log(postIdDiv)

  const postid = buttonId;

  console.log(postid);
  console.log(comment);

  if (comment) {
    await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        comment,
        postid,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    document.location.reload();
  }
};

document.querySelectorAll('#commentButton').forEach(button => {button.addEventListener('click', commentFormHandler)});
  
