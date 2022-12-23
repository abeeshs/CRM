
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
    {
        firstname:{
            type:String,
            required:[true,'Please enter firstname']
        },
        lastname:{
            type:String,
            required:[true,'Please enter lastname']
        },
        email:{
           type:String,
           unique: true,
            required:[true,"please enter email address"]
        },
        mobile:{
            type:Number,
            reqiured:[true,'Pleace enter mobile number']
        },
        contact_owner:{
            type:String,
            required:true
        },
        job_title:{
            type:String,
           
        },
        lifecycle_stage:{
            type:String
        },
        lead_status:{
            type:String
        }
       

    },
    {
        timestamps:true
    }
    
)


export default mongoose.model('Admin',adminSchema);