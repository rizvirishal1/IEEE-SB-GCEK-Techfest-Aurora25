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
    IEEEMemberStatus: {
        type: String,
        default: "Verification Pending"
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