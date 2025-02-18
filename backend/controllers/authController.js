
import cloudinary from '../config/cloudinary.js';
import { generatedToken } from '../config/utlis.js';
import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const signup=async(req,res)=>{
   
    const {fullName,email,password}=req.body;
    try {
         
        if(!fullName || !email || !password)
        {
           return res.status(400).json({
                success:false,
                message:"All fields required"
            }) 
        }
        
        if(password.length<6)
        {
            return res.json({
                success:false,
                message:"Password must be at least 6 charaters"
            }) 
        }

        const user= await userModel.findOne({email});
        if(user)
            {
                return res.json({
                    success:false,
                    message:"User already exists"
                }) 
            }
         
         const hashedPassword= await bcrypt.hash(password,10);
         const newUser=new userModel({fullName,email,password:hashedPassword});
         
         if( newUser)
         {
            //generate jwt token
            generatedToken(newUser._id,res);
            await newUser.save();
         }
         
         res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
          });
    } catch (error) {
      return  res.json({
            success:false,
            message:error.message
        })
    }
}


export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password)
            {
               return res.json({
                    success:false,
                    message:"All field are required"
                }) 
            }
        
            const user= await userModel.findOne({email})
            if(!user)
            {
                return res.json({
                    success:false,
                    message:"User Not found"
                });
            }
            const isPasswordCorrect = await bcrypt.compare(password,user.password);
            if(!isPasswordCorrect)
            {
                return res.json({
                    success:false,
                    message:"Invaild Cerdentials"
                });
            }

            generatedToken(user._id,res);

            res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePic: user.profilePic,
              });


    } catch (error) {
        res.json({
            success:false,
            message:error.message
        }) 
    }
}

export const logout=async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({
            success:true,
            message:"Logged out SuccessFully"
        })
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        }) 
    }
}

export const updateProfile=async(req,res)=>{
    try {
       const {profilePic}=req.body;
       const userId= req.user._id;

       if(!profilePic)
       {
        return res.json({
            success:false,
            message:"Profile pic is required"
        });
       }

       const uploadRespone = await cloudinary.uploader.upload(profilePic);
       const updateUser = await userModel.findByIdAndUpdate(userId,{profilePic:uploadRespone.secure_url},{new:true});

       res.json({
        success:true,
        updateUser
       })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })  
    }
}

export const checkAuth= (req,res)=>{
  try {
    res.json(req.user);
  } catch (error) {
    res.json({
        success:false,
        message:"Internal Server Error"
    })
  }
}