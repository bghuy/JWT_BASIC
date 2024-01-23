import express from "express";
import homeController from "../controller/home.js"
import api from "../controller/api.js";
const router = express.Router();
const initWebRoutes = (app) => {
    router.get("/", homeController.handleHome);
    router.get("/user", homeController.handleUser);
    router.post("/users/create", homeController.handleCreateNewUser)
    router.post("/user/delete/:id", homeController.handleDeleteUser)
    router.get("/update/:id", homeController.renderUpdatePage)
    router.post("/user/update/:id", homeController.handleUpdateUser)
    router.get("/api/test-api", api.testApi);
    return app.use('/', router);
}

export default initWebRoutes;