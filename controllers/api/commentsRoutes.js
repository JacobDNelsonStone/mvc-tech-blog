const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Comments } = require("../../models");


router.post("/", async (req, res) => {
  console.log(req.body)
  try {
    const newComment = await Comments.create({
      comment: req.body.comment,
      user_id: req.session.user_id,
      post_id: req.body.postid
       
    });
    console.log(newComment);
    res.status(200).json(newComment);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

