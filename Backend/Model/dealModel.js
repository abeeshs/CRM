import mongoose from "mongoose";
const dealSchema =new mongoose.Schema(
    {
        email:{
            type:String,
            
        },
        otp:{
           type:String,
           unique: true,
           
        },
        

    },
    {
        timestamps:true
    }
)
export default mongoose.model("Deal",dealSchema)