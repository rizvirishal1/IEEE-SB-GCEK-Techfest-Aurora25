import mongoose from "mongoose";

const EventTicketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    eventId: {
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
    paymentScreenshot: {
        type: String
    }
});

export default mongoose.model("EventTicket", EventTicketSchema);