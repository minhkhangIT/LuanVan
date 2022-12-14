'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Patient_Account extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // static associate(models) {
        //     Patient.hasMany(models.Booking, { foreignKey: 'patientId', as: 'patientData' })
        //     Patient.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'id', as: 'genderDataPatient' })
        // }
    };
    Patient_Account.init({
        phoneNumber: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Patient_Account',
    });
    return Patient_Account;
};