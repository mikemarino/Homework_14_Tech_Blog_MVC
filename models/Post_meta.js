// Post Meta Table can be used to store additional information of a post including the post banner URL etc.
const {
    Model,
    DataTypes
} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Post_meta extends Model {}
Post_meta.init({
    // 	The unique id to identify the post.
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    // 	The post id to identify the parent post.
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'post',
            key: 'id',
        }
    },
    //  The key identifying the meta.
    key: {
        type: DataTypes.STRING,
        allowNull: true,
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
    modelName: 'post_meta',
});

module.exports = Post_meta;