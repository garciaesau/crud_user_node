module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    'name': {
      type: Sequelize.STRING
    },
    'sex': {
      type: Sequelize.ENUM('M', 'F')
    },
    'age': {
      type: Sequelize.INTEGER
    },
    'hobby': {
      type: Sequelize.STRING
    },
    'birthdate': {
      type: Sequelize.DATE
    }
  });

  return User;
};
