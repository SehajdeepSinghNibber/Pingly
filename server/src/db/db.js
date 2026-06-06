import mongoose from "mongoose";
import config from "../config/config.js";

const connectDB = async () => { 
    try {
        await mongoose.connect(`${config.MONGO_URI}/Pingly`);
        console.log(`DB Connected!!`);
    } catch (error) {
        console.log(`db not connected`);
        console.log("Error connecting to MongoDB",error.message);
        process.exit(1);
    }
}

export default connectDB;