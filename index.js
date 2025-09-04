//imports...
import cors from 'cors';
import { dirname } from 'path';
import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import path from 'path';
//routers


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

//using the routers

//serving index.html for get request to non existing routes
app.get(/\/(.*)/, function (req, res) {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));
mongoose.connect(process.env.DATABASE_URL);

//starting the server
const renderPort = process.env.PORT;
const localPort = 5000;
app.listen(renderPort || localPort, () => {
    if (renderPort)
        console.log(`Server started at https:// \nPort: ${renderPort}`);
    else
        console.log(`Server started at http://localhost:${localPort}/`);

})
