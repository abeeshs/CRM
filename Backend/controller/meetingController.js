import asyncHandler from 'express-async-handler';
import * as meetingService from '../Services/meetingService.js';

export const addNewMeeting = asyncHandler(async (req, res) => {
	const { organizer, eventTitle, location, description, members, title, date, time, duration } =
		req.body;
console.log(req.body)
	const newMeeting = {
		created_by: req.user._id,
		organizer: organizer,
		event_title: eventTitle,
		location: location,
		description: description,
		team_members: members,
		scheduling_title: title,
		meeting_date: date,
		time: time,
		duration: duration
	};

	const createdMeeting = await meetingService.creatMeetingService(newMeeting);
	if (createdMeeting) {
		res.status(200).json({ message: 'Meeting Created Successfully',data:createdMeeting });
	} else {
		throw new Error('Failed to create meetings');
	}
});


export const getMembers = asyncHandler(async (req, res) => {
	
	const createdMeeting = await meetingService.getMemberDetails(req.body);
	if (createdMeeting) {
		res.status(200).json({ message: 'success',data:createdMeeting });
	} else {
		throw new Error('No members found');
	}
});