'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HandBook extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    };
    HandBook.init({
        nameVi: DataTypes.STRING,
        nameEn: DataTypes.STRING,
        descriptionHTML: DataTypes.TEXT,
        descriptionMarkdown: DataTypes.TEXT,
        image: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'HandBook',
    });
    return HandBook;
};