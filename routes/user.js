//imports...
import express from 'express';
import authenticateToken from '../middlewares/auth.js';
import uploadFileToS3 from '../services/uploadToS3.js';
import multer from "multer";

//dbs
import FestTicket from '../models/FestTicket.js';
import User from "../models/User.js";




const userRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

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

userRouter.post('/buy-fest-ticket', authenticateToken, upload.single("paymentScreenshot"), async (req, res) => {
    try {
        const userId = res.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isEarlyBird = req.body.isEarlyBird;

        const paymentScreenshot = req.file
        if (!paymentScreenshot) {
            return res.status(400).json({ error: "Payment screenshot is required" });
        }

        const existingTicket = await FestTicket.findOne({ userId: userId });
        if (existingTicket) {
            return res.status(400).json({ error: "User has already purchased a fest ticket" });
        }

        const newFestTicket = new FestTicket({
            userId: userId,
            userName: user.name,
            mobile: user.mobile,
            isEarlyBird: isEarlyBird,
            purchaseStatus: "Verification Pending",
            paymentScreenshot: ""
        });

        const screenshotUrl = await uploadFileToS3(paymentScreenshot, paymentScreenshot.originalname, 'payment-screenshots');

        newFestTicket.paymentScreenshot = screenshotUrl;

        await newFestTicket.save();

        user.festTicket = { festTicketId: newFestTicket._id };
        await user.save();

        return res.status(200).json({ message: "Ticket purchased successfully" });

    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
});

userRouter.get('/fest-ticket', authenticateToken, async (req, res) => {
    try {
        console.log("get request for Fest Ticket details by a user")
        const userId = res.user._id;
        const festTicket = await FestTicket.findOne({
            userId: userId
        });
        return res.status(200).json(festTicket);
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
});

export default userRouter;