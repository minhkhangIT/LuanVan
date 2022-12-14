'use strict';

module.exports = {

  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123456',
      firstName: 'IT',
      lastName: 'Thanh Loc',
      address: 'AN Phuc',
      gender: 1,
      typeRole: 'ROLE',
      keyRole: 'R1',
      image: 'No',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};


