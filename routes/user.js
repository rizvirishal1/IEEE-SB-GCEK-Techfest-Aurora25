//imports...
import express from 'express';
import authenticateToken from '../middlewares/auth.js';
//dbs
import User from "../models/User.js";

const userRouter = express.Router();

userRouter.get('/dashboard', authenticateToken, async (req, res) => {
    try {
        const userId = res.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
});


export default userRouter;