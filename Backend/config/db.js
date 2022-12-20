import mongoose from 'mongoose';


export const connectDB=()=>{
    try{
        mongoose.set("strictQuery", false);
        const connect =mongoose.connect("mongodb+srv://abeesh:crmproject123@cluster0.2hkjejm.mongodb.net/CRM?retryWrites=true&w=majority");
        console.log("mongodb connected")
    }catch(err){
        console.log(err)

    }
}

