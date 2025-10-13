//imports...
import express from 'express';
import authenticateToken from '../middlewares/auth.js';
import uploadFileToS3 from '../services/uploadToS3.js';
import multer from "multer";
import twilio from "twilio"

//dbs
import EntryPass from '../models/EntryPass.js';
import EventTicket from '../models/EventTicket.js';
import FestTicket from '../models/FestTicket.js';
import User from "../models/User.js";




const userRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

userRouter.get('/dashboard', authenticateToken, async (req, res) => {
    try {
        const userMongoId = res.user._id;
        const user = await User.findById(userMongoId);
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
        const userMongoId = res.user._id;
        const user = await User.findById(userMongoId);
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

            const existingUnrejectedEntryPass = await EntryPass.findOne({ userMongoId: userMongoId, purchaseStatus: { $ne: "Rejected" } });
            if (existingUnrejectedEntryPass) {
                return res.status(400).json({ error: "User has already purchased an entry pass" });
            }

            const newEntryPass = new EntryPass({
                userMongoId: userMongoId,
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

        // For competition Ticket
        else if (type === "competition") {

            // extract parameters
            const eventId = req.body.eventId;
            const eventTitle = req.body.eventTitle;
            const price = req.body.price;
            const priceForIeeeMembers = req.body.priceForIeeeMembers;

            //validate parameters
            if (!eventId || !eventTitle || !price || !priceForIeeeMembers) {
                return res.status(400).json({ error: "All fields are required" });
            }

            const existingUnrejectedEvent = await EventTicket.findOne({ userMongoId: userMongoId, eventId: eventId, purchaseStatus: { $ne: "Rejected" } });
            if (existingUnrejectedEvent) {
                return res.status(400).json({ error: `User has already purchased an event ticket for the event: ${eventTitle}` });
            }

            const newEventTicket = new EventTicket({
                userMongoId: userMongoId,
                userName: user.name,
                mobile: user.mobile,
                eventId: eventId,
                eventName: eventTitle,
                purchasedAt: new Date(),
                purchaseStatus: "Verification Pending",
                paymentScreenshot: screenshotUrl,
            });

            await newEventTicket.save();

            user.eventTickets.push({ eventId: eventId, eventTicketMongoId: newEventTicket._id, purchaseStatus: "Verification Pending" });
            await user.save();
            return res.status(200).json({ message: "Event Ticket purchased successfully" });

        }

        const existingTicket = await FestTicket.findOne({ userMongoId: userMongoId });
        if (existingTicket) {
            return res.status(400).json({ error: "User has already purchased a fest ticket" });
        }

        const newFestTicket = new FestTicket({
            userMongoId: userMongoId,
            userName: user.name,
            mobile: user.mobile,
            isEarlyBird: isEarlyBird,
            purchaseStatus: "Verification Pending",
            paymentScreenshot: "",
            IEEEMemberStatus: user.IEEEMemberStatus,
        });



        newFestTicket.paymentScreenshot = screenshotUrl;

        await newFestTicket.save();

        user.festTicket = { festTicketMongoId: newFestTicket._id };
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
        const userMongoId = res.user._id;
        const festTicket = await FestTicket.findOne({
            userMongoId: userMongoId
        });
        return res.status(200).json(festTicket);
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
});

userRouter.get('/entry-pass', authenticateToken, async (req, res) => {
    try {
        console.log("get request for Entry Pass details by a user")
        const userMongoId = res.user._id;
        const user = await User.findById(userMongoId)
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

//get user details
userRouter.get('/details', authenticateToken, async (req, res) => {
    try {
        const userMongoId = res.user._id;
        const user = await User.findById(userMongoId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
});

export default userRouter;