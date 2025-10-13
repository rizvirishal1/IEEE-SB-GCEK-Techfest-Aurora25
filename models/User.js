import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    IEEEMemberId: {
        type: String,
    },
    IEEEMemberStatus: {
        type: String,
        enum: ["Verification Pending", "IEEE Member", "Non-IEEE Member", "Rejected"],
    },
    reasonForMembershipRejection: {
        type: String
    },
    rejectedAt: {
        type: Date
    },
    festTicket: {
        festTicketMongoId: { type: mongoose.Schema.Types.ObjectId, ref: "FestTicket" },
    },
    eventTickets: [{
        eventId: { type: String },
        eventName: { type: String },
        eventTicketMongoId: { type: mongoose.Schema.Types.ObjectId, ref: "EventTicket" },
        purchaseStatus: { type: String, default: "Verification Pending" }
    }],
    entryPassId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EntryPass"
    },
    PasswordResetRequestAt: {
        type: Date
    },
    otpForPasswordReset: {
        otp: { type: String },
        createdAt: { type: Date },
        verifiedAt: { type: Date }

    },

})

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(user.password, salt);
        user.password = hashed_password;
        next();
    } catch (error) {
        return next(error);
    }
});

export default mongoose.model("User", userSchema);