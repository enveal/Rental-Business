module.exports = (sequelize,Sequelize) => {
    const Transaction = sequelize.define("transaction" , {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          type: {
            type: Sequelize.STRING(100)
          },
          isBroken: {
            type: Sequelize.BOOLEAN
          },
    })
    return Transaction
}