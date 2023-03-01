import asyncHandler from 'express-async-handler'
import Meetings from '../Model/meetingModel.js'

export const creatMeetingService=asyncHandler(async(data)=>{

    const response= await Meetings.create(data)
    
    return response;

})

export const getMemberDetails=asyncHandler(async(data)=>{

    const response= await Meetings.findById(data)
    
    return response;

})
