import express from 'express';
import { updateUser,getUser,deleteUser,getAllUser,getStats } from '../api/user.js';
import {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin,refreshToken} from '../utils/verifyToken.js';

const router  = express.Router();

router.put("/:id",verifyTokenAndAuthorization,updateUser);

router.get("/",verifyToken,getUser);

router.delete("/:id",verifyTokenAndAdmin,deleteUser);

router.get("/allUser",verifyTokenAndAdmin,getAllUser);

router.get("/stats",verifyTokenAndAdmin,getStats);

router.get("/refresh",refreshToken,verifyToken,getUser);

export default router;