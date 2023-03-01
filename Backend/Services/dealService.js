import Deals from '../Model/dealModel.js';
import asyncHandler from 'express-async-handler';


//get all deals

export const getDealService =asyncHandler(async()=>{
	const result = await Deals.find()
	console.log(result)
	return result
})

// Create new deals
export const dealCreateService = asyncHandler(async (data) => {
	const result = await Deals.create(data);
	return result;
});

export const dealUpdateService =asyncHandler(async(data,id)=>{
	const result = await Deals.findByIdAndUpdate(id,{deal_stage:data})
	return result
})