'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('doctor_infor', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            doctorId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: "CASCADE",
                references: {
                    model: "Users",
                    key: "id"
                },
            },
            specialtyId: {
                type: Sequelize.INTEGER,
                onUpdate: 'CASCADE',
                onDelete: "CASCADE",
                references: {
                    model: "specialties",
                    key: "id"
                },
            },
            clinicId: {
                type: Sequelize.INTEGER,
                onUpdate: 'CASCADE',
                onDelete: "CASCADE",
                references: {
                    model: "clinics",
                    key: "id"
                },
            },
            priceId: {
                type: Sequelize.STRING,
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: "CASCADE",
                references: {
                    model: "allcodes",
                    key: "id"
                },
            },
            provinceId: {
                type: Sequelize.STRING,
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: "CASCADE",
                references: {
                    model: "allcodes",
                    key: "id"
                },
            },
            paymentId: {
                type: Sequelize.STRING,
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: "CASCADE",
                references: {
                    model: "allcodes",
                    key: "id"
                },
            },
            addressClinic: {
                type: Sequelize.STRING,
                allowNull: false
            },
            nameClinic: {
                type: Sequelize.STRING,
                allowNull: false
            },
            note: {
                type: Sequelize.STRING
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
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
        await queryInterface.dropTable('doctor_infor');
    }
};