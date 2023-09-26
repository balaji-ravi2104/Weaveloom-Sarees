import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        subject:{
            type:String,
            required:true
        },
        feedback:{
            type:String,
            required:true
        },
        
    }
);

export default mongoose.model('feedback',FeedbackSchema);