import Feedback from "../model/Feedback.js";

export const createFeedBack = async (req,res)=>{
    const newFeedback = new Feedback(req.body);
    try{
        const savedFeedback = await newFeedback.save();
        return res.status(200).json(savedFeedback);
    }catch(error){
        res.status(500).json(error);
    }
}


export const getOneFeedBack = async (req,res) =>{
    try{
        const feedback = await Feedback.findById({_id : req.params.id});
        return res.status(200).json(feedback);
    }catch(error){
        res.status(500).json(err);
    }
}
 
export const getAllFeedBack = async (req,res) =>{
    try{
        const feedback = await Feedback.find();
        return res.status(200).json(feedback);
    }catch(error){
        res.status(500).json(error);
    }
}


export const deleteFeedBack = async (req,res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.status(200).json("Feedback has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
}