import express from 'express';
import { register,login,logout } from '../api/auth.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout",verifyToken,logout);

export default router;