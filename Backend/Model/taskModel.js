import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
	{
		created_by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Admin',
			required: true
		},
		title: {
			type: String,
			required: true
		},

		task_type: {
			type: String,
			required: true
		},
		associated_with: {
			type:String
			// type: mongoose.Schema.Types.ObjectId,
			// ref: 'Contact'
		},
		assigned_to: {
			type: Array,
			ref: 'User',
			
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
		
        task_status:{
            default:"Pending",
            type:String
        },
		file:{
			type:String,
			
		}
	},
	{
		timestamps: true
	}
);
export default mongoose.model('Tasks',taskSchema);