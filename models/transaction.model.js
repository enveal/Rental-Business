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
          itemId:{
            type: Sequelize.INTEGER,
            forignKey:true
          },
          accountId:{
            type: Sequelize.INTEGER,
            forignKey:true
          },
    })
    return Transaction
}