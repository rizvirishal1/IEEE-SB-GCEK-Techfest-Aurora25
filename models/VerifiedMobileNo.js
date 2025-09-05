import mongoose from "mongoose";

const verifiedMobileNoSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true,
        unique: true
    }
});

export default mongoose.model("VerifiedMobileNo", verifiedMobileNoSchema);
