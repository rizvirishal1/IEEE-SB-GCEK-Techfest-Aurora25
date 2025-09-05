//imports...
import express from "express";
//dbs
import User from "../models/User.js";
import VerifiedMobileNo from "../models/VerifiedMobileNo.js";

const registerRouter = express.Router();

registerRouter.post('/', async (req, res) => {

    const { name, mobile, password } = req.body;

    if (!name || !mobile || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.exists({ mobile: mobile });

    if (existingUser) {
        return res.status(400).json({ error: "Mobile number already registered" });
    }

    const verifiedMobile = await VerifiedMobileNo.exists({ mobile: mobile });

    if (!verifiedMobile) {
        return res.status(400).json({ error: "Mobile number not verified" });
    }

    const newUser = new User({ name, mobile, password });

    try {
        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Error registering user" });
    }

});

export default registerRouter;