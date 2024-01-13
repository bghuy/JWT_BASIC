const mysql = require('mysql2/promise');
//config database
require('dotenv').config()
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('jwt', 'root', null, {
    host: 'localhost',
    dialect: "mysql"
});
const Connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'jwt',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = { connection, Connection };
