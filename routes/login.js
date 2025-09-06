//imports..
import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
//dbs
import User from "../models/User.js";

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
    try {
        const { mobile, password } = req.body;

        if (!mobile || !password) {
            return res.status(400).json({ error: "Mobile number and password are required" });
        }
        // validity
        if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
            return res.status(400).json({ error: "Invalid mobile number format" });
        }

        const user = await User.findOne({ mobile: mobile });

        if (!user) {
            return res.status(400).json({ error: "Mobile number not registered" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        const userPlainObject = {
            _id: user._id,
        }

        const token = jwt.sign(userPlainObject, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });

        return res.status(200).json({ message: "Login successful", token: token });
    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }



});

export default loginRouter;