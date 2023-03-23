import Deals from '../Model/dealModel.js';
import asyncHandler from 'express-async-handler';

//get all deals

export const getDealService = asyncHandler(async () => {
	const result = await Deals.find();
	return result;
});

//Check the deal is already exist or not
export const dealExist = asyncHandler(async (dealName) => {
	const isExist = await Deals.find({ deal_name: dealName });
	return isExist;
});

// Create new deals
export const dealCreateService = asyncHandler(async (data) => {
	const result = await Deals.create(data);
	return result;
});

export const dealUpdateService = asyncHandler(async (data, id) => {
	const result = await Deals.findByIdAndUpdate(id, { deal_stage: data });
	return result;
});
