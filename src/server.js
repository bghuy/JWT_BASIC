import express from "express"
import initWebRoutes from "./routes/web";
import configViewEngine from "./config/viewEngine";
require("dotenv").config()
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

configViewEngine(app);
initWebRoutes(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`JWT backend is running at http://localhost:${PORT}`)
})
