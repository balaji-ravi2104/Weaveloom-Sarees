import express from 'express';
import { resetPassword,verifyOTP,changePassword } from '../api/passwordReset.js';

const router = express.Router()

router.post("/passwordreset",resetPassword);
router.post("/verifyOTP",verifyOTP);
router.post("/changePassword",changePassword);

export default router;