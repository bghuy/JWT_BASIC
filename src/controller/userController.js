import userApiService from "./../service/userApiService.js"
require("dotenv").config();
const readFunc = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            const { page, limit } = req.query;
            let data = await userApiService.fetchWithPageAndLimit(+page, +limit);
            return res.status(200).json({
                EM: data.EM,//error message
                EC: data.EC,//error code -1 means error , 0 means no error
                DT: data.DT,//data
            });
        }
        else {
            let data = await userApiService.fetchAll();
            return res.status(200).json({
                EM: data.EM,//error message
                EC: data.EC,//error code -1 means error , 0 means no error
                DT: data.DT,//data
            });
        }

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from data",//error message
            EC: "-1",//error code -1 means error , 0 means no error
            DT: "",//data
        })

    }
}
const createFunc = async (req, res) => {
    try {
        if (req.body && req.body.email && req.body.phone && req.body.password && req.body.group) {
            // const { email, phone, username, password, address, sex, group } = req.body;

            let data = await userApiService.create(req.body);
            return res.status(200).json({
                EM: data.EM,//error message
                EC: data.EC,//error code -1 means error , 0 means no error
                DT: data.DT,//data
            });
        }
        else {
            return res.status(200).json({
                EM: "lack of information",//error message
                EC: -1,//error code -1 means error , 0 means no error
                DT: [],//data
            });
        }

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from data",//error message
            EC: "-1",//error code -1 means error , 0 means no error
            DT: "",//data
        })

    }
}
const updateFunc = async (req, res) => {
    try {
        if (req.body) {
            let data = await userApiService.update(req.body);
            return res.status(200).json({
                EM: data.EM,//error message
                EC: data.EC,//error code -1 means error , 0 means no error
                DT: data.DT,//data
            });
        }
        else {
            return res.status(200).json({
                EM: "no found update data",//error message
                EC: -1,//error code -1 means error , 0 means no error
                DT: [],//data
            });
        }

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from data",//error message
            EC: "-1",//error code -1 means error , 0 means no error
            DT: "",//data
        })

    }
}
const deleteFunc = async (req, res) => {
    try {

        if (req.body && req.body.id) {

            const id = req.body.id
            const data = await userApiService.deleteUser(id);
            return res.status(200).json({
                EM: data.EM,//error message
                EC: data.EC,//error code -1 means error , 0 means no error
                DT: data.DT,//data
            });
        }
        else {
            return res.status(200).json({
                EM: "cant not get user id",//error message
                EC: "-1",//error code -1 means error , 0 means no error
                DT: [],//data
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from data",//error message
            EC: "-1",//error code -1 means error , 0 means no error
            DT: "",//data
        })
    }
}
const getUserAccount = async (req, res) => {
    console.log("check user >> ", req.user);
    return res.status(200).json({
        EM: "ok",//error message
        EC: "0",//error code -1 means error , 0 means no error
        DT: {
            email: req.user.email,
            username: req.user.username,
            access_token: req.token,
            scope: req.user.scope.Roles,
        },//data
    })
}
module.exports = { readFunc, createFunc, updateFunc, deleteFunc, getUserAccount }