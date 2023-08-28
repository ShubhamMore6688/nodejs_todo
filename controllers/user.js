import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js";

export const userAll = async (req,res)=>{
    
};


export const register = async (req,res)=>{
  const {name, email, password}  = req.body;
  let user = await User.findOne({email});
  if(user){
    return res.status(404).json({
        success: false,
        message: "user is already exist",
    });
  }
  const hashedPass = await bcrypt.hash(password,10);
  user = await User.create({name, email, password: hashedPass });
  setCookie(user, res, 201, "Registered successfully");
};

export const login = async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return res.status(404).json({
            success:false,
            message: "Invalid email or password"
        });
    };

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(404).json({
            success:false,
            message: "Invalid email or password"
        });
    };

    setCookie(user, res, 201, `Welcome back, ${user.name}`);

};

export const getMyProfile = async(req,res)=>{
//   const {token} = req.cookies;
//   if(!token){
//     return res.status(404).json({
//         success:false,
//         message: "Login first",
//     });
//   }

//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   const user = await User.findById(decoded._id);
  res.status(200).json({
    success: true,
    user : req.user,
  });
};


export const logout = (req,res) =>{
   res.status(200).cookie("token","",{
    expires: new Date(Date.now()),
    sameSite: process.env.NODE_ENV==="Development" ? "lax": "none",
    secure: process.env.NODE_ENV==="Development" ? false: true,
  }).json({
    success: true,
    message: "logout successfully",
   });
};