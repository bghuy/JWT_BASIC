import db from "./../models/index.js"
import { hashPassword, checkPassword, isExistedEmail, isExistedPhone } from "./loginRegisterService.js"
const fetchWithPageAndLimit = async (page, limit) => {
    try {
        const offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            include: { model: db.Group, attributes: ['id', 'name', 'description'] },
            attributes: ['id', 'username', 'email', 'phone', 'sex', 'address'],
            order: [["id", "DESC"]]

        })
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }
        return {
            EM: "get users success",
            EC: "0",
            DT: data
        }
    } catch (error) {
        return {
            EM: "something wrongs with service",
            EC: "-2",
            DT: []
        }
    }
}

const fetchAll = async () => {
    try {
        let users = await db.User.findAll(
            {
                include: { model: db.Group, attributes: ['id', 'name'] },
                attributes: ['id', 'username', 'email', 'phone', 'sex'],
            }
        );
        if (users) {
            return {
                EM: "get data success",
                EC: "0",
                DT: users
            }
        }
        else {
            return {
                EM: "get data success",
                EC: "0",
                DT: []
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: "something wrongs with service",
            EC: "-2",
            DT: []
        }
    }
}
const fetch = async () => {

}
const update = async (data) => {

    try {
        let user = await db.User.findOne(
            { where: { id: data.id } }
        )
        if (user) {
            user.username = data.username;
            user.address = data.address;

            if (+data.group >= 0) {
                user.groupId = +data.group;

            }
            if (data.sex) {
                user.sex = data.sex;
            }
            await user.save()
            return {
                EM: "update user success",
                EC: "0",
                DT: []
            }
        }
        else {
            return {
                EM: "not found user",
                EC: "-1",
                DT: []
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM: "something wrongs with service",
            EC: "-2",
            DT: []
        }
    }
}
const create = async (data) => {
    try {
        if (await isExistedEmail(data.email)) {
            return {
                EM: "email has existed ",
                EC: "-1",
                DT: "email"
            }
        }
        if (await isExistedPhone(data.phone)) {
            return {
                EM: "phone has existed ",
                EC: "-1",
                DT: "phone"
            }
        }
        const hashedPassword = hashPassword(data.password);
        data = { ...data, password: hashedPassword, groupId: +data.group };
        console.log("check data>>", data);
        await db.User.create(data);
        return {
            EM: "create user success",
            EC: "0",
            DT: []
        }


    } catch (error) {
        return {
            EM: "user does not exist",
            EC: "2",
            DT: []
        }
    }
}
const deleteUser = async (id) => {
    try {
        console.log("check id >> ", id)
        const user = await db.User.findOne({
            where: { id: id }
        })
        if (user) {
            await db.User.destroy({
                where: { id: id }
            })
            return {
                EM: "delete user successfully",
                EC: "0",
                DT: []
            }
        }
        else {
            return {
                EM: "user does not exist",
                EC: "2",
                DT: []
            }
        }

    } catch (error) {
        console.log(error);
        return {
            EM: "something wrongs with service",
            EC: "-2",
            DT: []
        }
    }

}
module.exports = { fetchAll, fetch, update, create, deleteUser, fetchWithPageAndLimit }