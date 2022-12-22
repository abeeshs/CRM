import asyncHandler from 'express-async-handler';
import User from '../Model/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import Task from '../Model/taskModel.js'

export const createNewTask= asyncHandler(async(req,res)=>{
    console.log(req.body);
    const{title,type,associated,assignedTo,dueDate,time,description,priority}=req.body;

    const taskDetails={
        userId:assignedTo,
        title:title,
        task_type:type,
        associated_with:associated,
        assigned_to:assignedTo,
        priority:priority,
        due_date:dueDate,
        due_time:time,
        description:description,
        created_by:"req.user._id"

    }
    const newTask=await Task.create(taskDetails);
    if(newTask){
        res.status(200).json({message:"Task created successfully"})
    }else{
        res.status(400)
        throw new Error("task creation failed")
    }


})

//---------------Delete Task-------------
//Method- DELETE
export const deleteTask=asyncHandler(async(req,res)=>{
    const taskId=req.params.id;
    const task = await Task.deleteOne({_id:taskId})
    if(task){
        res.status(200).json({message:"Task deleted succesfully"})
    }else{
        res.status(400)
        throw new Error('Task delete failed')
    }
})

//-------------Edit Task-------------------
//Method -PUT
export const editTask =asyncHandler(async(req,res)=>{
    const taskID= req.params.id;
    console.log(taskID)
    const{title,type,associated,assignedTo,dueDate,time,description,priority}=req.body;

    const taskDetails={
        userId:assignedTo,
        title:title,
        task_type:type,
        associated_with:associated,
        assigned_to:assignedTo,
        priority:priority,
        due_date:dueDate,
        due_time:time,
        description:description,
        created_by:req.user._id
    }
    console.log(req.body)
    const task = Task.findById(taskID);
    if(task){
        const editTask =await Task.findByIdAndUpdate(taskID,taskDetails,{
            new: true
        })
        console.log(editTask)
        res.status(200).json({message:"Updated successfully"})

    }else{
        res.status(400)
        throw new Error("Task update failed")
    }
    
})