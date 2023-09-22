import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        img: { 
            type: String, 
            required: true 
        },
    }
)

export default mongoose.model("Blog",BlogSchema); 