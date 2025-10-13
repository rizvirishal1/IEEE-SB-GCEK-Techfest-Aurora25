import mongoose from "mongoose";

const EventTicketSchema = new mongoose.Schema({
    userMongoId: {
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
    eventId: {
        type: String,
        required: true
    },
    eventName: {
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
    rejectedAt: {
        type: Date
    },
    purchasedAt: {
        type: Date
    },
    verifiedAt: {
        type: Date
    },
    paymentScreenshot: {
        type: String
    }
});

export default mongoose.model("EventTicket", EventTicketSchema);