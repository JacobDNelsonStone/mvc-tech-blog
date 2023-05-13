const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', async (req, res) => {
  console.log('hi')
  try {
    const postData = await Post.findAll({
      include: [{ model: User ,
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
      }]
    });
    console.log(postData)
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render('homepage', {
      posts,
      // Pass the logged in flag to the template
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
