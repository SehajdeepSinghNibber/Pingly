import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async(req,res)=>{
    try {

        const loggedInUserId = req.userId;
        const filteredUsers = await User.find({_id:{$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUsersForSidebar:",error.message);
        res.status(500).json({
          success: false,
          message: "Internal Server Error"
        })
    }
};

export const getMessages = async(req,res)=>{
    try {
        const { id:userToChatId } = req.params;
        const myId = req.userId;

        const messages = await Message.find({
            $or:[
                {
                    senderId: myId,
                    recieverId: userToChatId
                },
                {
                    senderId: userToChatId,
                    recieverId: myId
                }
            ]
        });

        res.status(200).json({
            messages
        });

    } catch (error) {
        console.log("error in getMessages controller:",error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const sendMessage = async(req,res)=>{
    try {
        const { text, image } = req.body;
        const { id: recieverId } = req.params;
        const myId = req.userId;

        let imageUrl;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId:myId,
            recieverId,
            text,
            image: imageUrl
        })

        await newMessage.save();

        // todo: realtime functionality goes here => socket.io

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("error in sendMessage controller:",error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}