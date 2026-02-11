module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      id: {
        type: Sequelize.NUMBER,
        primaryKey: true
      }
    });
  
    return User;
  };
  