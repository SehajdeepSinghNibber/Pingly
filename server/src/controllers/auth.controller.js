import { error, profile } from 'node:console';
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req,res) =>{
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword){
            return res.status(400).json({
                error:"Passwords do not match"
            })
        }

        const user = await User.findOne({userName});

        if (user){
            return res.status(400).json({
                error: "Username already exists"
            })
        }

        // HASH PASSWORD HERE
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // api to fetch avatar = https://avatar-placeholder.iran.liara.run/
        //not using this api

        const maleImages = [
            "/Images/male/male_01.png",
            "/Images/male/male_02.png",
            "/Images/male/male_03.png",
        ];

        const femaleImages = [
            "/Images/female/female_01.png",
            "/Images/female/female_02.png",
            "/Images/female/female_03.png",
        ];

        const maleProfilePic =
        maleImages[Math.floor(Math.random() * maleImages.length)];

        const femaleProfilePic =
        femaleImages[Math.floor(Math.random() * femaleImages.length)];

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? maleProfilePic : femaleProfilePic
        });

        if (newUser) {
            //Generate JWT Tokens
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({
                error:"Invalid User data"
            })
        }

    } catch (error) {
        console.log("Error in Signup controller");
        res.status(500).json({
            error:`Internal Server Error, ${error.message}`,
        })
    }
}

export const login = (req,res) =>{
    console.log('login User');
}

export const logout = (req,res) =>{
    console.log('login User');
}