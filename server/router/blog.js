import express from 'express';
import {verifyTokenAndAdmin} from '../utils/verifyToken.js';
import { createBlog, updateBlog, deleteBlog, getAllBlog } from '../api/blog.js';

const router = express.Router();

router.post("/", verifyTokenAndAdmin,createBlog);

router.post("/:id", verifyTokenAndAdmin,updateBlog);

router.delete("/:id", verifyTokenAndAdmin,deleteBlog);

router.get("/",getAllBlog);

export default router;