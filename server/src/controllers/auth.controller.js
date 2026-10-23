import User from "../models/user.model.js";
import { authCookieOptions, generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import bcrypt from "bcryptjs"

export const signUp = async (req,res)=>{
    try {
        const { fullName, userName, email, password } = req.body;
        
        if(!fullName || !userName ||!email ||!password){
                return res.status(400).json({
                    message: "Fill all the required fields",
                    success: false
                })
        }

        if(password.length<6){
                return res.status(400).json({
                    success: false,
                    message: "Password must be 6 characters lomg"
                })
        }

        const existUser = await User.findOne({ email })
        if(existUser){
            return res.status(400).json({
                message:"email already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = new User({
                fullName,
                userName,
                email,
                password: hashedPassword
        })

        await user.save();

        generateTokenAndSetCookie(res,user._id)
        
        res.status(201).json({
            success: true,
            message: "User registered Successfully",
            user:{
                _id: user._id,
                fullName: user.fullName,
                userName: user.userName,
                email: user.email,
                password: undefined
            }
        })

    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({
            message: err,
            success: false
        })
    }
}

export const logIn = async (req,res)=>{
    try {
        const { email, password } = req.body;
        
        if(!email ||!password){
                return res.status(400).json({
                    message: "Fill all the required fields",
                    success: false
                })
        }

        const existUser = await User.findOne({ email })
        if(!existUser){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }

        const isMatch = await bcrypt.compare(password,existUser.password);

        if(!isMatch){
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            })
        }


        generateTokenAndSetCookie(res,existUser._id)
            
        res.status(200).json({
            success: true,
            message: "User logged in Successfully",
            user:{
                _id: existUser._id,
                fullName: existUser.fullName,
                userName: existUser.userName,
                email: existUser.email,
                password: undefined
            }
        })

    } catch (err) {
        console.error("Login error:", err);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

export const logOut = async (req,res)=>{
    try {
        res.clearCookie("token", authCookieOptions);
        res.status(200).json({
            success: true,
            message: "Logged Out Successfully !!"
        })
    } catch (err) {
        console.error("Logout error:", err);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false  
        })
    }
}