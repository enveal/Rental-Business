module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type: Sequelize.STRING(100)
        },
        Description: {
            type: Sequelize.STRING
        },
        Rent: {
            type: Sequelize.INTEGER,
        },
        size:{
            type: Sequelize.STRING(100)
        },
    })
}