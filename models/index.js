const User = require('./User');
const Category = require('./Category');
const Post_category = require('./Post_category');
const Post_comment = require('./Post_comment');
const Post_meta = require('./Post_meta');
const Post = require('./Post');

// remember to check the datatypes so that associated fields match ex, id INTEGER hasMany post_id INTEGER

User.hasMany(Post, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE'
})
Post.belongsTo(User, {
  foreignKey: 'author_id'
})

Post.belongsTo(Post, {
  as: 'parent',
  foreignKey: 'parent_id',
  targetKey: 'id'

})
Post.hasMany(Post, {
  as: 'subpost',
  foreignKey: 'parent_id'
})

Post_comment.belongsTo(Post_comment, {
  // as: 'parentComment',
  foreignKey: 'parent_id',
  // targetKey: 'id'
});

Post_comment.hasMany(Post_comment, {
  as: 'subComment',
  foreignKey: 'parent_id'

})

Category.hasMany(Category, {
  foreignKey: 'parent_id',
  as: 'children'
})

Post_meta.belongsTo(Post, {
  foreignKey: 'post_id'
})

Category.belongsToMany(Post, {
  through: {
    model: Post_category,
    unique: false
  },
  as: 'cat_posts'
})

Post.belongsToMany(Category, {
  through: {
    model: Post_category,
    unique: false
  },
  as: 'post_cat'
})

Post_comment.belongsTo(Post, {
  foreignKey: 'post_id'
})

Post.hasMany(Post_comment, {
  foreignKey: 'post_id'
})

Post_comment.belongsTo(User, {
  foreignKey: 'author_id'
})




// Post_category.hasMany(Post, {
//   foreignKey: 'id'
// })

// Post_category.hasMany(Category, {
//   foreignKey: 'id'
// })



// User.hasMany(Project, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Project.belongsTo(User, {
//   foreignKey: 'user_id'
// });

module.exports = {
  User,
  Category,
  Post_category,
  Post_meta,
  Post,
  Post_comment,
};