import loginRegisterService from "./../service/loginRegisterService.js"

const testApi = (req, res) => {
    return res.status(200).json({
        message: 'ok',
        data: 'test api'
    })
}
const createUser = async (req, res) => {
    try {

        if (!req.body || !req.body.email || !req.body.phone || !req.body.username || !req.body.password) {
            return res.status(200).json({
                EM: "missing required",//error message
                EC: "1",//error code -1 means error , 0 means no error
                DT: "",//data
            })
        }
        if (req.body.password && req.body.password.length < 3) {
            return res.status(200).json({
                EM: "the password must includes at least 3 letters",//error message
                EC: "1",//error code -1 means error , 0 means no error
                DT: "",//data
            })
        }
        //service
        const rawUserData = req.body;
        let data = await loginRegisterService.create(rawUserData);

        return res.status(200).json({
            EM: data.EM,//error message
            EC: data.EC,//error code -1 means error , 0 means no error
            DT: "",//data
        })
    } catch (error) {
        return res.status(500).json({
            EM: "error from data",//error message
            EC: "-1",//error code -1 means error , 0 means no error
            DT: "",//data
        })
    }
}

const login = async (req, res) => {
    try {
        if (!req.body || !req.body.valueLogin || !req.body.password) {
            return res.status(200).json({
                EM: "missing required",//error message
                EC: "1",//error code -1 means error , 0 means no error
                DT: "",//data
            })
        }
        if (req.body.password && req.body.password.length < 3) {
            return res.status(200).json({
                EM: "the password must includes at least 3 letters",//error message
                EC: "1",//error code -1 means error , 0 means no error
                DT: "",//data
            })
        }
        const rawUserData = req.body;
        let data = await loginRegisterService.login(rawUserData);
        // set cookie
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }

        return res.status(200).json({
            EM: data.EM,//error message
            EC: data.EC,//error code -1 means error , 0 means no error
            DT: data.DT,//data
        })
    } catch (error) {
        return res.status(500).json({
            EM: "error from data",//error message
            EC: "-1",//error code -1 means error , 0 means no error
            DT: "",//data
        })
    }
}

module.exports = { testApi, createUser, login };