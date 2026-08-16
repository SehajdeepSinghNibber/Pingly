import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (request,reply) =>{
    try {
        const loggedInUserId = request.user._id;
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password")

        reply.code(200).send({
            filteredUsers
        })
    } catch (error) {
        reply.code(500).send({
            error: "Internal Server Error"
        })
    }
}

export const getMessages = async (request,reply) =>{
    try {
        const {id: userToChat} = request.params
        const myId = request.user._id

        const messages = await Message.find({
            $or:[
                {
                    senderId: myId,
                    receiverId: userToChat
                },
                {
                    senderId: userToChat,
                    receiverId: myId
                },
            ]
        })

        reply.code(200).send({
            messages
        })

    } catch (error) {
        reply.code(500).send({
            error: "Internal Server Error"
        })
    }
}

export const sendMessage = async (request,replt) =>{
    try {
        const { text, image } = request.body;
        const {id: recieverId} = request.params;
        const senderId = request.user._id;

        let imageUrl;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        // real time functionality goes here => socket.io

        reply.code(201).send({
            newMessage
        })

    } catch (error) {
        console.log(error.message)
        reply.code(500).send({
            error: "Internal Server Error"
        })
    }
}