module.exports = {
  up: (queryInterface, Sequelize) =>
    (async () => {
      await queryInterface.createTable('user', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        status: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
        first_name: { type: Sequelize.STRING(50), allowNull: false },
        last_name: { type: Sequelize.STRING(50), allowNull: false },
        email: { type: Sequelize.STRING(50), allowNull: false },
        password: { type: Sequelize.STRING(100) },
        create_date: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
        login_date: { type: Sequelize.DATE },
        verify_pass_code: { type: Sequelize.STRING(50) },
        verify_pass_deadline: { type: Sequelize.DATE },
        birthday: { type: Sequelize.DATE },
        gender: { type: Sequelize.INTEGER },
      });
      await queryInterface.createTable('admin', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        status: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
        first_name: { type: Sequelize.STRING(50), allowNull: false },
        last_name: { type: Sequelize.STRING(50), allowNull: false },
        email: { type: Sequelize.STRING(50), allowNull: false },
        password: { type: Sequelize.STRING(100) },
        create_date: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
        login_date: { type: Sequelize.DATE },
        verify_pass_code: { type: Sequelize.STRING(50) },
        verify_pass_deadline: { type: Sequelize.DATE },
        permissions: { type: Sequelize.JSON },
      });
      await queryInterface.createTable('event_code', {
        id: { type: Sequelize.STRING(30), primaryKey: true },
        description: { type: Sequelize.STRING(200) },
      });
      await queryInterface.createTable('event_log', {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        event_date: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
        user_id: {
          type: Sequelize.INTEGER,
        },
        is_error: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
        event_id: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        description: { type: Sequelize.STRING(200) },
        debug_info: { type: Sequelize.JSON },
      });
    })(),

  down: queryInterface =>
    (async () => {
      await queryInterface.dropTable('user');
      await queryInterface.dropTable('admin');
      await queryInterface.dropTable('event_code');
      await queryInterface.dropTable('event_log');
    })(),
};
