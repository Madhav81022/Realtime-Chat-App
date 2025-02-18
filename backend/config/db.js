import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectedDB=async()=>{
   try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database be Connected");
   } catch (error) {
    console.log(error);
   }
}

export default connectedDB;