const logout = async function() {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out');
  }
};

const newPostSection = document.querySelector('.newpost');

const showNewPost = (e) => {
  e.preventDefault();
  console.log('clicked');

  newPostSection.classList.remove("hidden");
}

document.querySelector('#newPostTag').addEventListener('click', showNewPost);

document.querySelector('#logout-link').addEventListener('click', logout);
