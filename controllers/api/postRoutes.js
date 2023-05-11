const router = require('express').Router();
const { User, Post } = require('../../models');

router.get('/posts', async (req, res) => {
  // find all posts
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    });
    console.log(postData);

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }

})

module.exports = router;