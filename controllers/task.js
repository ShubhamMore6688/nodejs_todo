import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";
export const newTask = async (req,res) =>{
    const {title, description} = req.body;
    await Task.create({
        title,
        description,
        user: req.user,
    });

    res.status(200).json({
        success: true,
        message: "task added successfully",
    });

};

export const getMyTasks = async( req,res, next)=>{
    const userid = req.user._id;
    const tasks = await Task.find({user: userid});
    res.status(200).json({
        success:true,
        tasks,
    });
};

export const updateTask = async(req,res,next) =>{
   try {
    const {id} = req.params;
    const task = await Task.findById(id);
    if(!task) return next(new ErrorHandler("Invalid Id",404));
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
        success:true,
        message:"task is updated"
    });
   } catch (error) {
        next(error);
   }
};

export const deleteTask = async(req,res,next) =>{
   try {
    const {id} = req.params;
    const task = await Task.findById(id);
    if(!task) return next(new Error("Task not found"));
    // return res.status(404).json({
    //     success: false,
    //     message: "task not found"
    // });
    await task.deleteOne();

    res.status(200).json({
        success:true,
        message: "task is deleted successfully"
    });
   } catch (error) {
    next(error);
   }
};