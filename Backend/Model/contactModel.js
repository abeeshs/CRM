import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
	{
		firstname: {
			type: String,
			required: [true, 'Please enter firstname']
		},
		lastname: {
			type: String,
			required: [true, 'Please enter lastname']
		},
		email: {
			type: String,
			required: [true, 'Please enter email address'],
			unique:[true,'Email alredy exists'],
			// validate: {
			// 	validator: function(v){
			// 		return this.model('Contact').findOne({ email: v }).then(user => !user)
			// 	},
			// 	message: props => `${props.value} is already used by another user`
			// },
		},
		mobile: {
			type: Number,
			unique:[true,'Mobile already exists'],
			reqiured: [true, 'Pleace enter mobile number']
		},
		contact_owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		job_title: {
			type: String
		},
		lifecycle_stage: {
			type: String
		},
		lead_status: {
			type: String
		},
		created_by: {
			type: String
		}
	},
	{
		timestamps: true
	}
);

export default mongoose.model('Contact', contactSchema);
