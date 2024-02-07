import express from "express"
import initWebRoutes from "./routes/web";
import configViewEngine from "./config/viewEngine";
import initApiRoutes from "./routes/api.js"
require("dotenv").config()
const bodyParser = require('body-parser')
const app = express();
// Add headers before the routes are defined
import { configCors } from "./config/cors.js";
import { createJWT, verifyToken } from "./middlewares/JWTActions.js"
import cookieParser from "cookie-parser";
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
configCors(app);

// config cookie-parser
app.use(cookieParser())

configViewEngine(app);
initWebRoutes(app);
initApiRoutes(app);
const PORT = process.env.PORT || 3000;

app.use((req, res) => {
    res.send("404 not found");
})
app.listen(PORT, () => {
    console.log(`JWT backend is running at http://localhost:${PORT}`)
})
