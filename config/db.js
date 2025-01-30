const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    database: "postgres1",
});

sequelize
    .authenticate()
    .then(() => console.log('Database connected successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = sequelize;
