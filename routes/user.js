//imports...
import express from 'express';
import authenticateToken from '../middlewares/auth.js';
import uploadFileToS3 from '../services/uploadToS3.js';
import multer from "multer";

//dbs
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

userRouter.post('/buy-ticket', authenticateToken, upload.single("paymentScreenshot"), async (req, res) => {
    try {
        const userId = res.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const ticketType = req.body.type;
        const offerType = req.body.offerType;


        if (!ticketType) {
            return res.status(400).json({ error: "Invalid ticket" });
        }

        const paymentScreenshot = req.file
        if (!paymentScreenshot) {
            return res.status(400).json({ error: "Payment screenshot is required" });
        }

        if (ticketType === "festTicket") {
            user.festTicket = {
                isPurchased: true,
                purchaseStatus: "Verification Pending",
                offerType: offerType || "Regular",
            };
        }

        const screenshotUrl = await uploadFileToS3(paymentScreenshot, paymentScreenshot.originalname, 'payment-screenshots');

        user.festTicket.paymentScreenshot = screenshotUrl;

        await user.save();

        return res.status(200).json({ message: "Ticket purchased successfully" });

    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
});

export default userRouter;