import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

adminSchema.pre("save", async function (next) {
    const admin = this;
    if (!admin.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(admin.password, salt);
        admin.password = hashed_password;
        next();
    } catch (error) {
        return next(error);
    }
});

export default mongoose.model("Admin", adminSchema);
