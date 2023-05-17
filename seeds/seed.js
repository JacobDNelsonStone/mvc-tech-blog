const sequelize = require('../config/connection');
const { User, Post, Comments } = require('../models');

const userData = require('./userData.json');
const postData = require('./posts.json');
const commentsData = require('./comments.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  })
  await Comments.bulkCreate(commentsData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};


seedDatabase();
