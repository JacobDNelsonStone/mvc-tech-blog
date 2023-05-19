const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const newPost = require('./newpostRoutes');

router.use('/newpost', newPost);
router.use('/user', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;
