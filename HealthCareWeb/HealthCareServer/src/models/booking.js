'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Booking.belongsTo(models.User, { foreignKey: 'doctorId' })
            Booking.belongsTo(models.User, { foreignKey: 'doctorId', targetKey: 'id', as: 'DoctorDataBooking' })
            Booking.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'id', as: 'timeTypeDataBooking' })
            Booking.belongsTo(models.Allcode, { foreignKey: 'genderPatient', targetKey: 'id', as: 'genderDataPatient' })
            Booking.hasOne(models.Prescription, { foreignKey: 'bookingId' })
        }
    };
    Booking.init({
        statusId: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,
        patientAccountId: DataTypes.INTEGER,
        emailPatient: DataTypes.STRING,
        fullNamePatient: DataTypes.STRING,
        addressPatient: DataTypes.STRING,
        phoneNumberPatient: DataTypes.STRING,
        genderPatient: DataTypes.STRING,
        birthdayPatient: DataTypes.STRING,
        date: DataTypes.STRING,
        timeType: DataTypes.STRING,
        token: DataTypes.STRING,
        reason: DataTypes.STRING,
        price: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};