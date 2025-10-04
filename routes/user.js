//imports...
import express from 'express';
import authenticateToken from '../middlewares/auth.js';
import uploadFileToS3 from '../services/uploadToS3.js';
import multer from "multer";
import twilio from "twilio"

//dbs
import EntryPass from '../models/EntryPass.js';
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

userRouter.post('/buy-ticket', authenticateToken, upload.single("paymentScreenshot"), async (req, res) => {
    try {
        const userId = res.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Extract the body parameters
        const isEarlyBird = req.body.isEarlyBird;
        const type = req.body.type;

        const paymentScreenshot = req.file
        if (!paymentScreenshot) {
            return res.status(400).json({ error: "Payment screenshot is required" });
        }

        const screenshotUrl = await uploadFileToS3(paymentScreenshot, paymentScreenshot.originalname, 'payment-screenshots');

        // For Entry Pass
        if (type === "Entry Pass") {

            const existingUnrejectedEntryPass = await EntryPass.findOne({ userId: userId, purchaseStatus: { $ne: "Rejected" } });
            if (existingUnrejectedEntryPass) {
                return res.status(400).json({ error: "User has already purchased an entry pass" });
            }

            const newEntryPass = new EntryPass({
                userId: userId,
                userName: user.name,
                mobile: user.mobile,
                purchaseStatus: "Verification Pending",
                paymentScreenshot: screenshotUrl,
            });

            await newEntryPass.save();

            user.entryPassId = newEntryPass._id;
            await user.save();
            return res.status(200).json({ message: "Entry Pass purchased successfully" });
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
            paymentScreenshot: "",
            IEEEMemberStatus: user.IEEEMemberStatus,
        });



        newFestTicket.paymentScreenshot = screenshotUrl;

        await newFestTicket.save();

        user.festTicket = { festTicketId: newFestTicket._id };
        await user.save();

        return res.status(200).json({ message: "Ticket purchased successfully" });

    } catch (error) {
        console.log(error)
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

userRouter.get('/entry-pass', authenticateToken, async (req, res) => {
    try {
        console.log("get request for Entry Pass details by a user")
        const userId = res.user._id;
        const user = await User.findById(userId)
        const entryPassId = user.entryPassId;
        const entryPass = await EntryPass.findById(entryPassId);
        return res.status(200).json({ entryPass: entryPass });
    } catch (error) {
        console.error("Error fetching entry pass details:", error);
        return res.status(500).json({ error: "Server error" });
    }
});

userRouter.post('/generate-otp-for-password-reset', async (req, res) => {
    try {
        const mobile = req.body.mobile;
        const user = await User.findOne({ mobile: mobile });

        if (!user) {
            return res.status(404).json({ error: "User with this mobile number does not exist" });
        }

        if (user.PasswordResetRequestAt && (Date.now() - new Date(user.PasswordResetRequestAt).getTime()) < 1000) {
            return res.status(429).json({ error: "Too many requests" });
        }

        user.PasswordResetRequestAt = new Date();

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

        await client.messages.create({
            body: "Your OTP for password reset is " + otp,
            messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
            to: "+91" + mobile,
        });

        user.otpForPasswordReset.otp = otp;
        user.otpForPasswordReset.createdAt = new Date();
        user.otpForPasswordReset.verifiedAt = undefined;

        await user.save();

        return res.status(200).json({ message: "OTP sent successfully" });

    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
});

userRouter.post('/verify-otp-for-password-reset', async (req, res) => {
    try {
        const { mobile, otp } = req.body;

        const user = await User.findOne({ mobile: mobile });

        if (!user) {
            return res.status(404).json({ error: "User with this mobile number does not exist" });
        }

        if (user.otpForPasswordReset.otp !== otp) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        user.otpForPasswordReset.otp = undefined;
        user.otpForPasswordReset.verifiedAt = new Date();

        await user.save();

        return res.status(200).json({ message: "OTP verified successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
});


userRouter.post('/reset-password', async (req, res) => {
    try {
        const { mobile, newPassword } = req.body;
        const user = await User.findOne({ mobile: mobile });

        if (!user) {
            return res.status(404).json({ error: "User with this mobile number does not exist" });
        }
        if (!user.otpForPasswordReset.verifiedAt) {
            return res.status(400).json({ error: "OTP not verified" });
        }

        user.password = newPassword;
        user.otpForPasswordReset.verifiedAt = undefined;

        await user.save();
        return res.status(200).json({ message: "Password reset successfully" });


    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
});


export default userRouter;