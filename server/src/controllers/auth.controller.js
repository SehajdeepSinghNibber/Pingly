import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signup = async (request, reply) => {
  
    const {fullName,email,password} = request.body;

    try {

        if(!fullName || !email || !password){
            return reply.code(400).send({
                message:"All fields are required!!"
            })
        }

        if(password.length<6){
            return reply.code(400).send({
                message: "Password must be atleast 6 characters long"
            })
        }

        const user = await User.findOne({email});

        if(user){
            return reply.code(400).send({
                message: "email already exists"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            email,
            fullName,
            password: hashedPassword
        })

        if(newUser){
            // Generate jwt token here
            await newUser.save();
            generateToken(newUser._id,reply)

            reply.code(201).send({
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic
            })
        }
        else{
            reply.code(400).send({
                message: "Invalid User Data",
            })
        }


  } catch (error) {
    console.error(error.message);

    return reply.code(500).send({
        message: "Internal server error"
    });
  }
};

export const signout = async (request, reply) => {
  return "Signout";
};

export const login = async (request, reply) => {
  return "Login";
};