import { Router } from 'express';
import { VisitsController } from '../controllers/visits.controller.js';
const router = Router();
router.get('/visits', VisitsController.report);
export default router;
