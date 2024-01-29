import groupService from "./../service/groupService.js"
const readFunc = async (req, res) => {
    try {
        let data = await groupService.getGroup()
        return res.status(200).json({
            EM: data.EM,//error message
            EC: data.EC,//error code -1 means error , 0 means no error
            DT: data.DT,//data
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from data",//error message
            EC: "-1",//error code -1 means error , 0 means no error
            DT: "",//data
        })
    }
}

module.exports = { readFunc }
