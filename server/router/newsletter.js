import express from 'express';
import { createNewsLetter } from '../api/newsletter.js';
import { verifyToken } from '../utils/verifyToken.js';

const router  = express.Router();

router.post("/",verifyToken,createNewsLetter);

export default router;