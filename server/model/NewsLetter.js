import mongoose from "mongoose";

const NewsLetterSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    }
});

export default mongoose.model('newsletter',NewsLetterSchema);