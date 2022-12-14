'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Prescription extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Prescription.belongsTo(models.Booking, { foreignKey: 'bookingId' })
        }
    };
    Prescription.init({
        bookingId: DataTypes.INTEGER,
        diagnostic: DataTypes.TEXT,
        advice:DataTypes.TEXT,
        prescription: DataTypes.TEXT,
        dateReExamination: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Prescription',
    });
    return Prescription;
};