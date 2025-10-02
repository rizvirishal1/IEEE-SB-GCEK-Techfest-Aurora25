import mongoose from "mongoose";

const festTicketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },

    purchaseStatus: {
        type: String,
        enum: ["Rejected", "Verified", "Verification Pending"],
        default: "Verification Pending"
    },
    reasonForRejection: {
        type: String
    },
    isEarlyBird: {
        type: Boolean,
        default: false
    },
    IEEEMemberStatus: {
        type: String,
        enum: ["Verification Pending", "IEEE Member", "Non-IEEE Member", "Rejected"],
    },
    paymentScreenshot: {
        type: String
    }
});

export default mongoose.model("FestTicket", festTicketSchema);