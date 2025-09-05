import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update updatedAt before save
otpSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Update updatedAt before findOneAndUpdate
otpSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});

export default mongoose.model("Otp", otpSchema);