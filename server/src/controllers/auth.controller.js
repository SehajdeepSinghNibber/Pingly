import { error, profile } from 'node:console';
import User from '../models/user.model.js'

export const signup = async (req,res) =>{
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword){
            return resizeBy.status(400).json({
                error:"Passwords do not match"
            })
        }

        const user = await User.findOne({userName});

        if (user){
            return resizeBy.status(400).json({
                error: "Username already exists"
            })
        }

        // HASH PASSWORD HERE

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
            password,
            gender,
            profilePic: gender === "male" ? maleProfilePic : femaleProfilePic
        });

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic
        })

    } catch (error) {
        console.log("Error in Signup controller");
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
}

export const login = (req,res) =>{
    console.log('login User');
}

export const logout = (req,res) =>{
    console.log('login User');
}