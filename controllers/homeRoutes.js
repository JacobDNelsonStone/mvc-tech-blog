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
        model: Comments
      }  
      ],
    });
    console.log(postData)

    const posts = postData.map((post) => post.get({ plain: true }));
    
    console.log(posts);

    // const commentData = await Comments.findAll({
    //   include: [{
    //     model: User,
    //     attributes: { exclude: ['password'] },
    //     order: [['name', 'ASC']],
    //   }]
    // });
    // console.log(commentData)

    // const commentss = commentData.map((comment) => comment.get({ plain: true }));
    
    // console.log(commentss);
    res.render('homepage', {
      posts,
      // commentss
      // Pass the logged in flag to the template
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  console.log('route seen');
  try {
    const userData = await User.findOne({
      where: {id: req.session.user_id},
      include: [{
        model: Post
      }],
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],

    });
    console.log(userData)

    const users = userData.get({ plain: true });

    console.log(users);

    res.render('newpost', {
      layout: 'dashboard',
      users,
      // Pass the logged in flag to the template
      // logged_in: req.session.logged_in,
    });
  } catch (err) {
  console.log(err)
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
