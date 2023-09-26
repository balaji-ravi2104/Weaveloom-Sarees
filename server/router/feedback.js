import express from 'express';
import {createFeedBack, deleteFeedBack, getAllFeedBack, getOneFeedBack} from '../api/feedback.js';
import { verifyToken, verifyTokenAndAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.post("/create",verifyToken,createFeedBack);

router.get('/find/:id',verifyTokenAndAdmin,getOneFeedBack);

router.get("/",verifyTokenAndAdmin,getAllFeedBack);

router.delete("/delete/:id",verifyTokenAndAdmin,deleteFeedBack);


export default router;