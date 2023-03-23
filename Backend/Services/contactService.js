import asyncHandler from 'express-async-handler';
import Contact from '../Model/contactModel.js'

export const createContactService = asyncHandler(async (data) => {
	const contact = await Contact.create(data);
    return contact
});
