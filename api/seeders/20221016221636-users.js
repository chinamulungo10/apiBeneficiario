module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', 
    [
      {
        name: "Chinamulungo",
        password: "54321",
        email: "chafim.chinamulungo@univates.universo.br",
        age: 24,
        sex: "M",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};