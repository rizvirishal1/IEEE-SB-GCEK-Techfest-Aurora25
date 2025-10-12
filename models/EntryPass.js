import mongoose from "mongoose";

const entryPassSchema = new mongoose.Schema({
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
    purchaseStatus: {
        type: String,
        enum: ["Rejected", "Verified", "Verification Pending"],
        default: "Verification Pending"
    },
    purchasedAt: {
        type: Date,
        default: Date.now
    },
    reasonForRejection: {
        type: String
    },
    rejectedAt: {
        type: Date
    },
    verifiedAt: {
        type: Date
    },
    paymentScreenshot: {
        type: String
    }
});

export default mongoose.model("EntryPass", entryPassSchema);