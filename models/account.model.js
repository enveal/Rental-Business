module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define("account", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name:{
        type: Sequelize.STRING(100)
    },
    address: {
        type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    AadharCard: {
        type: Sequelize.INTEGER
    },
    creditLimit: {
        type: Sequelize.INTEGER 
    }
  });
  return Account
};
