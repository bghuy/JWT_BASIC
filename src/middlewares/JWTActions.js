import jwt from "jsonwebtoken"
require("dotenv").config()
const nonSecurePaths = ['/user/login', '/user/register'];

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key);
    } catch (error) {
        console.log(error);
    }
    console.log(token);
    return token;

}
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    // return jwt.verify(token, key);
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error);
    }
    return decoded;
}
const checkUserPermission = (req, res, next) => {
    console.log("path", req.path);
    if (nonSecurePaths.includes(req.path)) return next();
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.scope.Roles;
        let currentUrl = req.path;
        if (!roles && roles.length === 0) {
            return res.status(403).json({
                EM: `you don't have permission to access this resource ....`,
                EC: -1,
                DT: []
            })
        }
        console.log("check currentPath", currentUrl);
        console.log(roles);
        let canAccess = roles.some(item => {
            return item.url === currentUrl;
        });
        if (canAccess) {
            next();
        }
        else {
            return res.status(403).json({
                EM: `you don't have permission to access this resource ....`,
                EC: -1,
                DT: []
            })
        }
    }
    else {
        return res.status(401).json({
            EM: "Not authenticated the user",
            EC: -1,
            DT: []
        })
    }
}
const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        let token = cookies.jwt
        console.log("my jwt: ", token);
        let decoded = verifyToken(token);

        if (decoded) {
            req.user = decoded;
            next();
        }
        else {
            return res.status(401).json({
                EM: "Not authenticated the user",
                EC: -1,
                DT: []
            })
        }
    }
    else {
        return res.status(401).json({
            EM: "Not authenticated the user",
            EC: -1,
            DT: []
        })
    }
}


module.exports = { createJWT, verifyToken, checkUserJWT, checkUserPermission }