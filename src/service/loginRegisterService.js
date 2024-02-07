
import db from "../models/index"
const bcrypt = require('bcryptjs');
import { Op } from 'sequelize';
import { scope } from "./JWTServices.js"
import { createJWT, verifyToken } from "./../middlewares/JWTActions.js"
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();
const hashPassword = (password) => {
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
}
const checkPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
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
        await db.User.create({ email: email, password: hashedPassword, username: username, phone: phone, groupId: 4 });
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
const login = async (loginData) => {
    try {
        if (await isExistedEmail(loginData.valueLogin) || await isExistedPhone(loginData.valueLogin)) {
            const user = await db.User.findOne({
                where: {
                    [Op.or]: [
                        { email: loginData.valueLogin },
                        { phone: loginData.valueLogin }
                    ]
                }
            })
            if (user && user.password && checkPassword(loginData.password, user.password)) {
                let roles = await scope(user);
                let payload = {
                    email: user.email,
                    scope: roles,
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
                let token = createJWT(payload);
                let decoded = verifyToken(token);
                console.log("check decoded >> ", decoded);
                return {
                    EM: "login successfully",//error message
                    EC: "0",//error code -1 means error , 0 means no error
                    DT: {
                        access_token: token,
                        data: roles,
                    }
                }
            } else {
                return {
                    EM: "login unsuccessfully",//error message
                    EC: "1",//error code -1 means error , 0 means no error
                }
            }
        }
        else {
            return {
                EM: "The email or phone number or password you entered isn't connected to an account",//error message
                EC: "1",//error code -1 means error , 0 means no error
                DT: ""
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrongs in service",//error message
            EC: "-2",//error code -1 means error , 0 means no error
            DT: ""
        }
    }

}

module.exports = { create, login, hashPassword, checkPassword, isExistedEmail, isExistedPhone }