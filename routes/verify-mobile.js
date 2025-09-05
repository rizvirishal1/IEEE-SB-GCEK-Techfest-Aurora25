//imports...
import express from "express";
import twilio from "twilio"
//models
import Otp from "../models/Otp.js";
import User from "../models/User.js";
import VerifiedMobileNo from "../models/VerifiedMobileNo.js";

const verifyMobileRouter = express.Router();

verifyMobileRouter.post('/generate-otp', async (req, res) => {

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);
    const mobile = req.body.mobile;
    const existingUser = await User.exists({ mobile: mobile });

    if (!mobile || mobile.length !== 10) {
        return res.status(400).json({ error: "Invalid mobile number" });
    }


    if (existingUser) {
        return res.status(400).json({ error: "Mobile number already registered. Please Login" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const existingMobile = await Otp.findOne({ mobile: mobile })

    // Prevent rapid OTP requests (allow one request per 5 seconds)
    const MIN_INTERVAL_MS = 5 * 1000; // 5 seconds
    const now = Date.now();

    if (existingMobile) {
        if (existingMobile.updatedAt && (now - new Date(existingMobile.updatedAt).getTime()) < MIN_INTERVAL_MS) {
            return res.status(429).json({ error: "Please wait before requesting another OTP." });
        }
        await Otp.updateOne({ mobile: mobile }, { otp: otp });
    } else {
        const newOtp = new Otp({ mobile, otp });
        await newOtp.save();
    }

    await client.messages.create({
        body: "Your OTP code is " + otp,
        messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
        to: "+91" + mobile,
    });

    return res.status(200).json({ message: "OTP sent successfully" });



});

verifyMobileRouter.post('/verify-otp', async (req, res) => {
    const { mobile, otp } = req.body;

    if (!mobile || !otp || mobile.length !== 10 || otp.length !== 6) {
        return res.status(400).json({ error: "Invalid mobile number or OTP" });
    }



    // Check if the OTP is valid
    const otpRecord = await Otp.findOne({ mobile, otp });
    if (!otpRecord) {
        return res.status(400).json({ error: "Invalid OTP" });
    }

    // OTP is valid, proceed with verification
    await Otp.deleteOne({ mobile });

    const alreadyVerified = await VerifiedMobileNo.exists({ mobile });
    if (!alreadyVerified) {

        const verifiedMobile = new VerifiedMobileNo({ mobile });
        await verifiedMobile.save();
    }

    return res.status(200).json({ message: "Mobile number verified successfully" });

});

export default verifyMobileRouter;