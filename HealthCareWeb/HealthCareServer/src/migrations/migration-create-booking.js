'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('bookings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            statusId: {
                type: Sequelize.STRING,
            },
            doctorId: {
                type: Sequelize.INTEGER,
                onUpdate: 'CASCADE',
                onDelete: "CASCADE",
                references: {
                    model: "Users",
                    key: "id"
                },
            },
            patientAccountId: {
                type: Sequelize.INTEGER,
                onUpdate: 'CASCADE',
                onDelete: "CASCADE",
                references: {
                    model: "Patient_Accounts",
                    key: "id"
                },
            },
            emailPatient: {
                type: Sequelize.STRING
            },
            fullNamePatient: {
                type: Sequelize.STRING
            },
            addressPatient: {
                type: Sequelize.STRING
            },
            genderPatient: {
                type: Sequelize.STRING
            },
            birthdayPatient: {
                type: Sequelize.STRING,
            },
            phoneNumberPatient: {
                type: Sequelize.STRING,
            },
            date: {
                type: Sequelize.STRING
            },
            timeType: {
                type: Sequelize.STRING
            },
            token: {
                type: Sequelize.STRING
            },
            reason: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('bookings');
    }
};