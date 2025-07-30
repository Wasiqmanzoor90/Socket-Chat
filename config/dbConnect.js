import mongoose from "mongoose";
import dotenv from "dotenv";


const ConnectDb = async () => {
    try {
        const url = process.env.MONGODB_URL;
        const res = await mongoose.connect(url);
        if(res)
        {
            console.log("Database connected successfully");
        }

    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

export default ConnectDb;