import express from "express";
import apiController from "../controller/api.js";
const router = express.Router();
const initApiRoutes = (app) => {
    router.get("/test-api", apiController.testApi);
    router.post("/user/create", apiController.createUser);
    return app.use('/api/v1', router);
}

export default initApiRoutes;