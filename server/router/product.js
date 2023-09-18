import express from "express";
import {verifyTokenAndAdmin} from '../utils/verifyToken.js';
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from "../api/product.js";

const router = express.Router()


router.post("/",verifyTokenAndAdmin,createProduct);

router.put("/:id",verifyTokenAndAdmin,updateProduct);

router.delete("/:id",verifyTokenAndAdmin,deleteProduct);

router.get("/find/:id",getProduct);

router.get("/",getAllProduct);

export default router;