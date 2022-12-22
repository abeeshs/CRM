import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		title: {
			type: String,
			required: true
		},

		task_type: {
			type: String,
			required: true
		},
		associate_with: {
			type: String
		},
		assigned_to: {
			type: String,
			required: true
		},
		priority: {
			type: String,
			required: true
		},
		due_date: {
			type: String,
			required: true
		},
		due_time: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		created_by: {
			type: String
		},
        task_status:{
            default:"Pending",
            type:String
        }
	},
	{
		timestamps: true
	}
);
export default mongoose.model('Tasks',taskSchema);