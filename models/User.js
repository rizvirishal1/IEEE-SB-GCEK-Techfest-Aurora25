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
        default: "Verification Pending"
    },
    festTicket: {
        offerType: String,
        isPurchased: { type: Boolean, default: false },
        purchaseStatus: { type: String, default: "Not Purchased" },
        paymentScreenshot: { type: String },
    },
    eventTickets: [{
        eventId: { type: String },
        isPurchased: { type: Boolean, default: false },
        purchaseStatus: { type: String, default: "Not Purchased" }
    }],

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