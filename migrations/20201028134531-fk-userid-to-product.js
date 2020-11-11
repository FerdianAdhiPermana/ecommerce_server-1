'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return [
        queryInterface.addColumn('products', 'creator_id', {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        }),
      ];
  },

  down: async (queryInterface, Sequelize) => {
      return [
          queryInterface.removeColumn('products', 'creator_id')
      ];
  }
};
