import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const generatedToken= (userId,res)=>{
   
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"});

    //send the token in cookies to the user
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000, //MS
        httpOnly:true, //prevent XSS attacks cross-site scripting attacks
        smaeSite:"strict",//CSRF attacks cross-site request forqery attacks
        secure:process.env.NODE_ENV !== "development",
    });

    return token;
}