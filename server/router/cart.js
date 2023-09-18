import express from "express";
import {verifyTokenAndAuthorization,verifyTokenAndAdmin, verifyToken} from '../utils/verifyToken.js';
import { createCart, deleteCart, getAllCart, getCart, updateCart } from "../api/cart.js";

const router = express.Router();

router.post("/",verifyToken,createCart);

router.put("/:id",verifyTokenAndAuthorization,updateCart);

router.delete("/:id",verifyTokenAndAuthorization,deleteCart);

router.get("/find/:userId",verifyTokenAndAuthorization,getCart);

router.get("/",verifyTokenAndAdmin,getAllCart);

export default router;