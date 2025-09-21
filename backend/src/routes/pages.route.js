import { homePage } from '../controllers/page.controller.js';
import express from 'express';

const router = express.Router();


router.get('/homePage', homePage);
// router.get('/about', about);

export default router;
