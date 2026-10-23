import mongoose from "mongoose";
import config from "../config/config.js";

const MONGO_URI = config.MONGO_URI;

if(!MONGO_URI){
    console.error("MONGO_URI is missing in environment variables");
    process.exit(1);
}

export const connectDB = async()=>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log("DB is connected");
        console.log(`MongoDB Host: ${mongoose.connection.host}`);
        console.log(`Database Name: ${mongoose.connection.name}`);
    } catch (err) {
        console.error(err)
        process.exit(1);
    }
}