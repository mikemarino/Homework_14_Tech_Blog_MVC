// Category Table and Post Category Table to store the post categories and their mappings.
const {
    Model,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Category extends Model {}
Category.init({
    // 	The unique id to identify the category.
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
   //  The parent id to identify the parent category.
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'category',
            key: 'id',
        }
    },
    // 	The post title to be displayed on the Category Page and the lists..
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
    modelName: 'category',
});

module.exports = Category;