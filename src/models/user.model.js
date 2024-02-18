import mongoose, { Schema, mongo } from "mongoose";

const userSchema = new Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minlength: 3,
        lowercase: true,
        index: true, 
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    fullname:{
        type: String,
        required: [true, "Fullname is required"],
        trim: true,
        index: true,
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken:{
        type: String,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);