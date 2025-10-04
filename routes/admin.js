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
import EntryPass from '../models/EntryPass.js';

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
        const userMongoId = res.user._id;
        const admin = await Admin.findById(userMongoId);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        const usersForVerification = await User.find({ IEEEMemberStatus: "Verification Pending", IEEEMemberId: { $ne: "" } });
        return res.status(200).json(usersForVerification);

    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
});

adminRouter.post('/verifyMembership/:userMongoId', authenticateToken, async (req, res) => {
    try {
        const adminId = res.user._id;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        const { userMongoId } = req.params;
        const { status } = req.body;
        const { reason } = req.body;
        if (!["Verified", "Rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }
        const user = await User.findById(userMongoId);
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
        const festTicket = await FestTicket.findOne({ userMongoId: userMongoId });
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
            const user = await User.findById(festTicket.userMongoId);
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

adminRouter.get('/entryPassesForVerification', authenticateToken, async (req, res) => {
    try {
        const adminId = res.user._id;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        const noOfEntryPassesBought = await EntryPass.countDocuments({ purchaseStatus: { $ne: "Rejected" } });
        const entryPassesForVerification = await EntryPass.find({ purchaseStatus: "Verification Pending" });

        return res.status(200).json({ entryPassesForVerification: entryPassesForVerification, noOfEntryPassesBought: noOfEntryPassesBought });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" })
    }
})

adminRouter.post('/verifyEntryPass/:ticketId', authenticateToken, async (req, res) => {
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
        const entryPass = await EntryPass.findById(ticketId);
        if (!entryPass) {
            return res.status(404).json({ error: "Entry Pass not found" });
        }
        entryPass.purchaseStatus = status;
        if (status === "Rejected" && reason) {

            if (entryPass.rejectedAt && Date.now() - entryPass.rejectedAt < 1000) {
                return res.status(400).json({ error: "Too many rejections in a short time. Please wait before rejecting again." });
            }

            entryPass.reasonForRejection = reason;
            entryPass.rejectedAt = new Date();
            const user = await User.findById(entryPass.userMongoId);
            if (user) {
                user.entryPassId = undefined;
                await user.save();
            }
            const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
            if (user.mobile) {

                const message = `Dear ${user.name},\n
Your Entry Pass purchase was rejected.\n
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
        await entryPass.save();
        return res.status(200).json({ message: "Entry Pass status updated successfully" });
    }
    catch (err) {
        return res.status(500).json({ error: "Server Error" })
    }
})

// Event Ticket verification...
// approve or reject an event ticket purchase
adminRouter.post('/verifyEventTicket/:ticketId', authenticateToken, async (req, res) => {
    try {

        // Validate admin
        const adminId = res.user._id;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        // Extract parameters
        const { eventTicketMongoId } = req.params;
        const {
            status,
            reasonForRejection,
        } = req.body;

        // Validate parameters
        if (!["Verified", "Rejected"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const eventTicket = await EventTicket.findById(eventTicketMongoId);
        if (!eventTicket) {
            return res.status(404).json({ error: "Event Ticket not found" });
        }

        const user = await User.findById(eventTicket.userMongoId);

        eventTicket.purchaseStatus = status;
        if (status === "Rejected" && reasonForRejection) {

            if (eventTicket.rejectedAt && Date.now() - eventTicket.rejectedAt < 1000) {
                return res.status(400).json({ error: "Too many rejections in a short time. Please wait before rejecting again." });
            }
            eventTicket.reasonForRejection = reasonForRejection;
            eventTicket.rejectedAt = new Date();

            user.eventTickets = user.eventTickets.filter(et => et.eventTicketMongoId.toString() !== eventTicketMongoId);

            const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
            const message = `Dear ${user.name},\n
Your event ticket purchase for the event: ${eventTicket.eventTitle} was rejected.
Reason: ${reasonForRejection || "N/A"}
Any amount paid will be refunded soon.
Please contact the admin for further details.
Ajay E. K. - 85929 36392
- IEEE Aurora Team`;
            await client.messages.create({
                body: message,
                messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
                to: "+91" + user.mobile,
            });


        } else {
            user.eventTickets = user.eventTickets.map(et => {
                if (et.eventTicketMongoId.toString() === eventTicketMongoId) {
                    et.purchaseStatus = "Verified";
                }
            });
        }

        await eventTicket.save();
        await user.save();

        return res.status(200).json({ message: "Event Ticket status updated successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
});

// get unverified event tickets for verification
adminRouter.get('/unverifiedEventTickets', authenticateToken, async (req, res) => {
    try {
        // Validate admin
        const adminId = res.user._id;
        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }

        const unverifiedEventTickets = await EventTicket.find({ purchaseStatus: "Verification Pending" });

        return res.status(200).json(unverifiedEventTickets);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
});



export default adminRouter;