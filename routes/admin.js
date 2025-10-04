//imports...
import bcrypt from 'bcryptjs';
import express from 'express';
import jwt from 'jsonwebtoken';
import twilio from "twilio"
//db
import Admin from '../models/Admin.js';
import User from '../models/User.js';
import authenticateToken from '../middlewares/auth.js';
import FestTicket from '../models/FestTicket.js';
import EventTicket from '../models/EventTicket.js';

const adminRouter = express.Router();

adminRouter.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const admin = await Admin.findOne({ username: username });

        if (!admin) {
            return res.status(400).json({ error: "Admin not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);


        if (!isPasswordValid) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        const userPlainObject = {
            _id: admin._id,
        }

        const token = jwt.sign(userPlainObject, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });

        return res.status(200).json({ message: "Login successful", token: token });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Server error" });
    }
});

adminRouter.post("/create", async (req, res) => {
    try {
        const { username, password, PASS } = req.body;

        if (PASS !== process.env.ADMIN_CREATION_PASS) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }
        const existingAdmin = await Admin.findOne({ username: username });
        if (existingAdmin) {
            return res.status(400).json({ error: "Admin with this username already exists" });
        }

        const newAdmin = new Admin({ username, password });
        await newAdmin.save();

        return res.status(201).json({ message: "Admin created successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
});

adminRouter.get('/verifyMembership', authenticateToken, async (req, res) => {
    try {
        const userId = res.user._id;
        const admin = await Admin.findById(userId);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        const usersForVerification = await User.find({ IEEEMemberStatus: "Verification Pending", IEEEMemberId: { $ne: "" } });
        return res.status(200).json(usersForVerification);

    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
});

adminRouter.post('/verifyMembership/:userId', authenticateToken, async (req, res) => {
    try {
        const adminId = res.user._id;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        const { userId } = req.params;
        const { status } = req.body;
        const { reason } = req.body;
        if (!["Verified", "Rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.IEEEMemberStatus = status;



        if (status === "Rejected" && reason) {

            if (user.rejectedAt && Date.now() - user.rejectedAt < 1000) {
                return res.status(400).json({ error: "Too many rejections in a short time. Please wait before rejecting again." });
            }

            user.reasonForMembershipRejection = reason;
            user.rejectedAt = new Date();
            const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
            if (user.mobile) {
                const message = `Dear ${user.name},\n
Your IEEE Membership was rejected.\n
Reason: ${reason || "N/A"}\n
Please contact the admin for further details.\n
Ajay E. K. - 85929 36392\n
- IEEE Aurora Team`;

                await client.messages.create({
                    body: message,
                    messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
                    to: "+91" + user.mobile,
                });
            }
        }

        await user.save();
        const festTicket = await FestTicket.findOne({ userId: userId });
        if (festTicket) {
            festTicket.IEEEMemberStatus = status;
            await festTicket.save();
        }

        return res.status(200).json({ message: "Membership status updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});

adminRouter.get('/verifyEventTickets', authenticateToken, async (req, res) => {
    try {
        const adminId = res.user._id;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        const eventTicketsForVerification = await EventTicket.find({ purchaseStatus: "Verification Pending" });

        return res.status(200).json(eventTicketsForVerification);
    }
    catch (err) {
        return res.status(500).json({ error: "Server Error" })
    }
}
)

adminRouter.get('/verifyFestTickets', authenticateToken, async (req, res) => {
    try {
        const adminId = res.user._id;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        const festTicketsForVerification = await FestTicket.find({ purchaseStatus: "Verification Pending" });

        return res.status(200).json(festTicketsForVerification);
    }

    catch (err) {
        return res.status(500).json({ error: "Server Error" })

    }
}
)

adminRouter.post('/verifyFestTicket/:ticketId', authenticateToken, async (req, res) => {
    try {
        const adminId = res.user._id;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        const { ticketId } = req.params;
        const { status } = req.body;
        const { reason } = req.body;
        if (!["Verified", "Rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }
        const festTicket = await FestTicket.findById(ticketId);
        if (!festTicket) {
            return res.status(404).json({ error: "Fest Ticket not found" });
        }
        festTicket.purchaseStatus = status;
        if (status === "Rejected" && reason) {

            if (festTicket.rejectedAt && Date.now() - festTicket.rejectedAt < 1000) {
                return res.status(400).json({ error: "Too many rejections in a short time. Please wait before rejecting again." });
            }

            festTicket.reasonForRejection = reason;
            festTicket.rejectedAt = new Date();
            const user = await User.findById(festTicket.userId);
            if (user) {
                user.festTicket = undefined;
                await user.save();
            }
            const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
            if (user.mobile) {

                const message = `Dear ${user.name},\n
Your fest ticket purchase was rejected.\n
Reason: ${reason || "N/A"}\n
Please contact the admin for further details.\n
Ajay E. K. - 85929 36392\n
- IEEE Aurora Team`;

                await client.messages.create({
                    body: message,
                    messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
                    to: "+91" + user.mobile,
                });

            }
        }
        await festTicket.save();
        return res.status(200).json({ message: "Fest Ticket status updated successfully" });
    }
    catch (err) {
        return res.status(500).json({ error: "Server Error" })
    }
})

export default adminRouter;