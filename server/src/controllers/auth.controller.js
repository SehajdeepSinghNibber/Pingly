import User from "../models/user.model.js";
import { authCookieOptions, generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import mongoose from "mongoose";

export const signUp = async (req, res) => {
    try {
        const { fullName, userName, email, password } = req.body;
        
        if (!fullName || !userName || !email || !password) {
            return res.status(400).json({
                message: "Fill all the required fields",
                success: false
            });
        }

        if (typeof password !== "string" || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        const existUser = await User.findOne({ $or: [{ email }, { userName }] });
        if (existUser) {
            return res.status(400).json({
                message: existUser.email === email ? "Email already exists" : "Username already exists",
                success: false
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            fullName,
            userName,
            email,
            password: hashedPassword
        });

        await user.save();

        generateTokenAndSetCookie(res, user._id);
        
        return res.status(201).json({
            success: true,
            message: "User registered Successfully",
            user:{
                _id: user._id,
                fullName: user.fullName,
                userName: user.userName,
                email: user.email,
            }
        });

    } catch (err) {
        console.error("Signup error:", err);
        if (err instanceof mongoose.Error.ValidationError || err.code === 11000) {
            return res.status(400).json({
                message: "Invalid signup data or account already exists",
                success: false
            });
        }
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                message: "Fill all the required fields",
                success: false
            });
        }

        const existUser = await User.findOne({ email });
        if (!existUser) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, existUser.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        generateTokenAndSetCookie(res, existUser._id);
            
        return res.status(200).json({
            success: true,
            message: "User logged in Successfully",
            user:{
                _id: existUser._id,
                fullName: existUser.fullName,
                userName: existUser.userName,
                email: existUser.email,
            }
        });

    } catch (err) {
        console.error("Login error:", err);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token", authCookieOptions);
        return res.status(200).json({
            success: true,
            message: "Logged Out Successfully !!"
        });
    } catch (err) {
        console.error("Logout error:", err);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false  
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const profileImage = req.body.profileImage ?? req.body.profilePic;
        if (typeof profileImage !== "string" || !profileImage) {
            return res.status(400).json({
                success: false,
                message: "Profile image is required"
            });
        }

        const uploadResponse = await cloudinary.uploader.upload(profileImage);
        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { profileImage: uploadResponse.secure_url },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user: updatedUser
        });
    } catch (err) {
        console.error("Profile update error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        console.error("Check auth error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};