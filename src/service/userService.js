
const bcrypt = require('bcryptjs');
import { emit } from 'nodemon';
import { connection, Connection } from '../config/database.js';
import db from '../models/index.js';
const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
}
const tbName = 'user'
const add = async (email, username, password) => {
    const hashedPassword = hashPassword(password);
    // const [results, fields] =
    //     await connection.query(`INSERT INTO ${tbName} (email,username,password) VALUES(?,?,?)`
    //         , [email, username, hashedPassword]);
    await db.User.create({ email: email, password: hashedPassword, username: username });
    return;
}

const fetchAll = async () => {
    let users = [];
    users = await db.User.findAll();
    // const [results, fields] = await connection.query(`SELECT * FROM ${tbName}`);
    return users;

}
const remove = async (id) => {
    // const [results, fields] = await connection.query(`DELETE FROM ${tbName} WHERE id=?`, [id]);
    await db.User.destroy({
        where: {
            id: id
        }
    });
    return;
}

const fetch = async (id) => {
    // const [results, fields] = await connection.query(`SELECT * FROM ${tbName} WHERE id=?`, [id]);
    const data = await db.User.findOne({ where: { id: id } });
    const user = await data.dataValues;
    return user;
}
const update = async (email, username, id) => {
    // const [results, fields] = await connection.query(`
    // UPDATE ${tbName}
    // SET email = ?, username= ?
    // WHERE id = ?`, [email, username, id])
    await db.User.update({ email: email, username: username }, {
        where: {
            id: id
        }
    });
    return;
}
module.exports = { hashPassword, add, fetchAll, remove, fetch, update }