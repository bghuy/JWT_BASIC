import express from "express"
import initWebRoutes from "./routes/web";
import configViewEngine from "./configs/viewEngine";
require("dotenv").config()
const app = express();
configViewEngine(app);
initWebRoutes(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`JWT backend is running at http://localhost:${PORT}`)
})
