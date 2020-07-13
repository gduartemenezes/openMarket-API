module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'seller', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('user', 'seller');
  },
};
