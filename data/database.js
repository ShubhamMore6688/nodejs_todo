import mongoose from "mongoose";

export const connectDB = () =>{
    mongoose.connect(process.env.MONGOD_URI,{dbName: "backendapi",}).then(()=>{
    console.log("database connected");
});
}