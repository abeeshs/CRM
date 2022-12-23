import Admin from '../Model/adminModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
import User from '../Model/userModel.js'
import Tasks from '../Model/taskModel.js'

export const addNewContact =asyncHandler(async(req,res)=>{
    console.log(req.body)
    const{email,mobile,firstname,lastname,contactOwner,jobtitle,lifecycle,leadStatus}=req.body
    if(!email|| !mobile ||!firstname || !lastname || !contactOwner || !jobtitle|| !lifecycle ||!leadStatus){
        res.status(400)
        throw new Error("All fields required")
    }else{
        const newContact={
            firstname:firstname,
            lastname:lastname,
            mobile:mobile,
            contact_owner:contactOwner,
            job_title:jobtitle,
            lifecycle_stage:lifecycle,
            lead_status:leadStatus
        }
    }
})