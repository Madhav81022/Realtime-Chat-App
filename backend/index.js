import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoute.js';
import connectedDB from './config/db.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/messageRoute.js';
import dotenv from "dotenv";
import {app,server} from "./config/socket.js";
import path from "path";

dotenv.config();
//const app=express();

const __dirname=path.resolve();


app.use(cookieParser());
app.use(express.json());
app.use(cors(
{
    origin:"http://localhost:5173",
    credentials:true,
    optionSuccessStatus:200
}
));


// app.get('/',(req,res)=>{
//     res.send("hello this friend thei ")
// })
app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);

// app.get('/',(req,res)=>{
//     res.send("server resdy")
// })

connectedDB();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }

const port =process.env.PORT ;

server.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})