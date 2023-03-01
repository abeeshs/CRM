import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema(
	{
		created_by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Admin',
			required: true
		},
		organizer: {
			type: String,
			required: true
		},
		event_title: {
			type: String,
			required: true
		},

		location: {
			type: String,
			required: true
		},
		description: {
			type: String
			// type: mongoose.Schema.Types.ObjectId,
			// ref: 'Contact'
		},
		team_members: {
			type: [
				{
					memberId: {
						type: mongoose.Schema.Types.ObjectId,
						ref: 'User'
					}
				}
			]
		},
		scheduling_title: {
			type: String
		},
		meeting_date: {
			type: String
		},
		time: {
			type: String,
			required: true
		},
		duration: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

meetingSchema.pre(/^find/, function () {
	this.populate('team_members.memberId');
});
meetingSchema.pre(/^save/, function () {
	this.populate('team_members.memberId');
});
export default mongoose.model('Meetings', meetingSchema);
