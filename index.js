//imports...
import cors from 'cors';
import { dirname } from 'path';
import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import path from 'path';
//routers
import adminRouter from './routes/admin.js';
import loginRouter from './routes/login.js';
import registerRouter from './routes/register.js';
import userRouter from './routes/user.js';
import verifyMobileRouter from './routes/verify-mobile.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const allowedOrigins = [
    "http://localhost:5173",              // local dev
    "http://localhost:3000",              // local dev - admin
    "https://aurora.ieeesbgcek.org",      // production
    "https://www.aurora.ieeesbgcek.org",   // if www is also used
    "https://www.aurora.admin.ieeesbgcek.org", // production - admin panel if www is also used
    "https://aurora.admin.ieeesbgcek.org"  // production - admin panel
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

//using the routers
app.use('/api/login', loginRouter);
app.use('/api/verify-mobile', verifyMobileRouter);
app.use('/api/register', registerRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

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
