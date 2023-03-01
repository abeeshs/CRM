import * as dealService from '../Services/dealService.js';
import asyncHandler from 'express-async-handler';

//View all deals

export const getAllDeals = asyncHandler(async (req, res) => {
	const allDeals = await dealService.getDealService();
	if (allDeals) {
		res.status(200).json(allDeals);
	} else {
		throw new Error('No deals found');
	}
});

//Create new Deals

export const addNewDeal = asyncHandler(async (req, res) => {
	console.log(req.body);
	const { dealName, dealStage, amount, closeDate, dealOwner, priority, contact } = req.body;

	const dealObj = {
		deal_name: dealName,
		deal_stage: dealStage,
		amount: amount,
		close_date: closeDate,
		deal_owner: dealOwner,
		priority: priority,
		deal_with_contact: contact,
		created_by: req.user._id,
		docModel: 'User'
	};
	const createdDeal = await dealService.dealCreateService(dealObj);

	if (createdDeal) {
		res.status(200).json({ message: 'Deal created successfully' });
	} else {
		throw new Error();
	}
});


//update Deal
export const updateDeal = asyncHandler(async (req, res) => {
	console.log(req.body);
    const dealId= req.params.id
	
	const updated = await dealService.dealUpdateService(req.body.data,dealId);
    console.log(updated)

	if (updated) {
		res.status(200).json({ message: 'Deal created successfully' });
	} else {
		throw new Error();
	}
});