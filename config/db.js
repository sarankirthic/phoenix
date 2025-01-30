const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
    dialect: "postgres",
    username: "saran",
    password: "EA55Vrq2FfjTmyUhuNzhUQmXewNRMMsL",
    host: "dpg-cudmph52ng1s73ejm0sg-a.oregon-postgres.render.com",
    port: "5432",
    database: "postgres1_idfa",
    dialectOptions: {
        ssl: true,
    }
});

//postgresql://saran:EA55Vrq2FfjTmyUhuNzhUQmXewNRMMsL@dpg-cudmph52ng1s73ejm0sg-a.oregon-postgres.render.com/postgres1_idfa

sequelize
    .authenticate()
    .then(() => console.log('Database connected successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = sequelize;
