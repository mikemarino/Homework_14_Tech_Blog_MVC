// Category Table and Post Category Table to store the post categories and their mappings.
const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Post_category extends Model {}
Post_category.init({
    // 	The unique id to identify the category.
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    post_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'post',
            key: 'id',
        }
    },

    //  The parent id to identify the parent category.
    category_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'category',
            key: 'id',
        }
    },
    // 	The post title to be displayed on the Post_category Page and the lists..
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
    // The column used to store the category data.
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
    modelName: 'post_category',
});

module.exports = Post_category;