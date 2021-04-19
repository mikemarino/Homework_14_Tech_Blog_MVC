// Comment Table to store the comment data
const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Post_comment extends Model {}
Post_comment.init({
    // 	The unique id to identify the comment.
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    // 	The author id to identify the comment author.
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'user',
            key: 'id',
        }
    },
    // 	The comment id to identify the parent comment.
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'post',
            key: 'id',
        }
    },
    // The parent id to identify the parent comment.
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'post_comment',
            key: 'id',
        }
    },
    // 	The post title to be displayed on the Post_comment Page and the lists..
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    // It can be used to identify whether the comment is publicly available.
    published: {
        type: DataTypes.STRING,
        allowNull: true,
        // defaultValue: DataTypes.NOW,
    },
    // It stores the date and time at which the comment is created.
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    // It stores the date and time at which the comment is published.
    published_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    // The column used to store the comment data.
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
    modelName: 'post_comment',
});

module.exports = Post_comment;