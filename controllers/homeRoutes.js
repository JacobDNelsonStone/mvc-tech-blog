const router = require('express').Router();
const { User, Post, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  console.log('hi')
  try {
    const postData = await Post.findAll({
      include: [{
        model: User,
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
      },
      {      
        model: Comments,
        include: [{
          model: User
        }]
      }
      ],
    });
    // console.log(postData[0].Comments)

    const posts = postData.map((post) => post.get({ plain: true }));

    const posts2 = posts.map( (post) => ({...post, logged_in: req.session.logged_in}) );

    console.log(posts.Comments);

    console.log(posts2)
    
    res.render('homepage', {
      posts2,
      logged_in: req.session.logged_in,
      // commentss
      // Pass the logged in flag to the template
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  console.log('route seen');
  try {
    const postData = await Post.findAll({
      where: {id: req.session.user_id},
      include: [{
        model: User,
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
      }],

    });
    console.log(postData)

    const posts = postData.map((post) => post.get({ plain: true }));

    const posts2 = posts.map( (post) => ({...post, logged_in: req.session.logged_in}) );

    
    console.log(posts);

    res.render('newpost', {
      layout: 'dashboard',
      posts2,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
  console.log(err)
  res.status(500).json(err);
}
});

router.get('/signup', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
