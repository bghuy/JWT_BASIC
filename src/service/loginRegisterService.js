
import db from "../models/index"
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
}
const isExistedEmail = async (email) => {
    const user = await db.User.findOne({
        where: { email: email }
    })
    if (user) {
        return true;
    }
    return false;

}
const isExistedPhone = async (phone) => {
    const user = await db.User.findOne({
        where: { phone: phone }
    })
    if (user) {
        return true;
    }
    return false;

}
const create = async (rawUserData) => {
    //check email,phone,username  existed
    // hash user password
    // create user
    try {
        const isValidEmail = await isExistedEmail(rawUserData.email);
        if (isValidEmail === true) {
            return { EM: "the email has already existed", EC: 1 }
        }
        const isValidPhone = await isExistedPhone(rawUserData.phone);
        if (isValidPhone === true) {
            return { EM: "the phone number has already existed", EC: 1 }
        }

        const { email, password, username, phone } = rawUserData;
        const hashedPassword = hashPassword(password);
        await db.User.create({ email: email, password: hashedPassword, username: username, phone: phone });
        console.log("here");
        return {
            EM: "created user successfully",//error message
            EC: "0",//error code -1 means error , 0 means no error
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrongs in service",//error message
            EC: "-2",//error code -1 means error , 0 means no error
        }
    }
}


module.exports = { create }