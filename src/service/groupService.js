import db from "../models";
const getGroup = async () => {
    try {
        let groups = await db.Group.findAll({ order: [['name', 'ASC']] });
        if (groups) {
            return {
                EM: "get data success",
                EC: "0",
                DT: groups
            }
        }
        else {
            return {
                EM: "no group found",
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

module.exports = { getGroup }