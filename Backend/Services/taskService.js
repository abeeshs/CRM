
import asyncHandler from 'express-async-handler';
import Tasks from '../Model/taskModel.js';



    // find all completed task
   export const getCompletedTask =asyncHandler(async(userId)=>{
        const task = await Tasks.find({assigned_to:userId,task_status:'Completed'}).populate('created_by')
        return task
    })

    //add document of task

    export const uploadTaskDocument =asyncHandler(async(taskId,fileName)=>{
        const task = await Tasks.findByIdAndUpdate(taskId,{file:fileName})
        console.log(task)
        return task
    })
