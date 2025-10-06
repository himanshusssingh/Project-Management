import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
{
    avatar: {
        type: {
            url: String,
            localPath: String,
        },
        default: {
            url: "https://placehold.co/300x300",
            localPath: ""
        }
    },
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required!"],
        trim: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required!"],
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String,
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordExpiry: {
        type: Date,
    },
    emailVerificationToken: {
        type: String,
    },
    emailVerificationExpiry: {
        type: Date,
    },
},
{
    timestamps: true,
}
);

//hashing 
userSchema.pre("save", async function (next) {
    if(!this.isModified("password"))
        return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});


export const User = mongoose.model("User", userSchema);