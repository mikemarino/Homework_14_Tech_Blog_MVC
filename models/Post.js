// Post Table to store the post data
const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}
Post.init({
    // 	The unique id to identify the post.
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    // 	The author id to identify the post author.
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'user',
            key: 'id',
        }
    },
    // 	The parent id to identify the parent post. It can be used to form the table of content of the parent post of series.
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'post',
            key: 'id',
        }
    },
    // 	The post title to be displayed on the Post Page and the lists..
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // The meta title to be used for browser title and SEO.
    meta_title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // The post slug to form the URL.
    slug: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // The summary of the post to mention the key highlights.
    summary: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // It can be used to identify whether the post is publicly available.
    published: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    // It stores the date and time at which the post is created.
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    // It stores the date and time at which the post is updated.
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    // It stores the date and time at which the post is published.
    published_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    // The column used to store the post data.
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
});

module.exports = Post;