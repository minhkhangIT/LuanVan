'use strict';
const {
    Model, TEXT
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Markdown.belongsTo(models.User, { foreignKey: 'doctorId' })
        }
    };
    Markdown.init({
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),
        doctorId: DataTypes.INTEGER,
        description: DataTypes.TEXT('long'),
    }, {
        sequelize,
        modelName: 'Markdown',
    });
    return Markdown;
};