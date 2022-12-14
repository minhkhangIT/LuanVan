'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('prescriptions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            bookingId: {
                type: Sequelize.INTEGER,
                onUpdate: 'CASCADE',
                onDelete: "CASCADE",
                references: {
                    model: "bookings",
                    key: "id"
                },
            },
            diagnostic: {
                type: Sequelize.TEXT
            },
            advice:{
                type: Sequelize.TEXT
            },
            prescription: {
                type: Sequelize.TEXT
            },
            dateReExamination: {
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
        await queryInterface.dropTable('prescriptions');
    }
};