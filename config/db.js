const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
    dialect: "postgres",
    username: "postgres1",
    password: "FaYh1ddzxj5lqV8ZjKQ7B3M2o45aJP7q",
    host: "dpg-cudkf4l2ng1s73eiisug-a.oregon-postgres.render.com",
    port: "5432",
    database: "postgres1_qfaz",
    dialectOptions: {
        ssl: true,
    }
});

sequelize
    .authenticate()
    .then(() => console.log('Database connected successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = sequelize;
