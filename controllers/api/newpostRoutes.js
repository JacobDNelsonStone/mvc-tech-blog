const router = require('express').Router();
const { User, Post } = require('../../models');

router.post('/', async (req, res) => {
  console.log('route seen');
  console.log(req.body);
  try {
    const newpostData = await Post.create({
      post_title: req.body.title,
      post_text: req.body.message, 
      post_date: req.body.postDate,
      user_id: req.session.user_id,
      include: [{
        model: User,
        where: req.session.user_id,
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']]
      }]
    });

    const newpost = newpostData.get({ plain: true });

    console.log(newpost);

    // const postData = await Post.findAll({
    //   where: {id: req.session.user_id},
    //   include: [{
    //     model: User,
    //     attributes: { exclude: ['password'] },
    //     order: [['name', 'ASC']],
    //   }],

    // });
    // console.log(postData)

    // const posts = postData.map((post) => post.get({ plain: true }));

    // console.log(posts);

    // res.render('newpost', {
    //   layout: 'dashboard',
    //   posts,
    //   // Pass the logged in flag to the template
    //   logged_in: req.session.logged_in,
    // });
    res.status(200).json({newpost})
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;