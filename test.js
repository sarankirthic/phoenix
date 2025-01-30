const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    database: "postgres1",
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });