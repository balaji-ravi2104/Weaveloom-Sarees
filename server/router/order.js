import express from 'express';
import {verifyTokenAndAuthorization,verifyTokenAndAdmin, verifyToken} from '../utils/verifyToken.js';
import { MONTHLYINCOME, createOrder, deleteOrder, getAllOrder, getOrder, updateOrder } from "../api/order.js";

const router = express.Router();

router.post("/",verifyToken,createOrder);

router.put("/:id",verifyTokenAndAdmin,updateOrder);

router.delete("/:id",verifyTokenAndAdmin,deleteOrder);

router.get("/find/:userId",verifyTokenAndAuthorization,getOrder);

router.get("/",verifyTokenAndAdmin,getAllOrder);

router.get("/income",verifyTokenAndAdmin,MONTHLYINCOME);

export default router;