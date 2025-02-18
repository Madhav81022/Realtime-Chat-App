import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';


export const authMiddlewares=async(req,res,next)=>{
  try {
    const token = req.cookies.jwt;

    if(!token)
    {
        return res.json({
            success:false,
            message:"No Token Provided"
        })
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded)
    {
        return res.json({
            success:false,
            message:"Invalid Token"
        })
    }

    const user = await userModel.findById(decoded.userId).select("-password");
    if(!user)
    {
        return res.json({
            success:false,
            message:"User not found"
        })
    }

    req.user=user;
    next();

  } catch (error) {
    return res.status(400).json({
        success:false,
        message:error.message
    })
  }
}