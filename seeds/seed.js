const sequelize = require('../config/connection');
const { User, Post, Post_comment } = require('../models');

const userData = require('./userData.json');
// const projectData = require('./projectData.json');
const postData = require('./post_seeds.json');
const commentData = require('./post_comment_seed.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const post = await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  const comment = await Post_comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });
  // const users = await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // }); 



  // for (const project of projectData) {
  //   await Project.create({
  //     ...project,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }

  process.exit(0);
};

seedDatabase();
