import express from 'express';
import { updateUser,getUser,deleteUser,getAllUser,getStats } from '../api/user.js';
import {verifyTokenAndAuthorization,verifyTokenAndAdmin} from '../utils/verifyToken.js';

const router  = express.Router();

router.put("/:id",verifyTokenAndAuthorization,updateUser);

router.get("/find/:id",verifyTokenAndAdmin,getUser);

router.delete("/:id",verifyTokenAndAdmin,deleteUser);

router.get("/",verifyTokenAndAdmin,getAllUser);

router.get("/stats",verifyTokenAndAdmin,getStats);

export default router;