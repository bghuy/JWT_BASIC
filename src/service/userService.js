
const bcrypt = require('bcryptjs');
import { connection, Connection } from '../config/database.js';
const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
}
const tbName = 'user'
const add = async (email, username, password) => {
    const hashedPassword = hashPassword(password);
    const [results, fields] =
        await connection.query(`INSERT INTO ${tbName} (email,username,password) VALUES(?,?,?)`
            , [email, username, hashedPassword]);
    return;
}

const fetchAll = async () => {
    await Connection();
    const [results, fields] = await connection.query(`SELECT * FROM ${tbName}`);
    return results;

}
const remove = async (id) => {
    const [results, fields] = await connection.query(`DELETE FROM ${tbName} WHERE id=?`, [id]);
}

const fetch = async (id) => {
    const [results, fields] = await connection.query(`SELECT * FROM ${tbName} WHERE id=?`, [id]);
    return results;
}
const update = async (email, username, id) => {
    const [results, fields] = await connection.query(`
    UPDATE ${tbName}
    SET email = ?, username= ?
    WHERE id = ?`, [email, username, id])
    return;
}
module.exports = { hashPassword, add, fetchAll, remove, fetch, update }