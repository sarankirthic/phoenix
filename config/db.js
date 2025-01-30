const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialectOptions: {
        ssl: true,
    }
});

sequelize
    .authenticate()
    .then(() => console.log('Database connected successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = sequelize;
