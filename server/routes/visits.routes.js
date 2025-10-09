import { Router } from 'express';
import { VisitsController } from '../controllers/visits.controller.js';
const router = Router();
router.post('/', VisitsController.create);
router.get('/', VisitsController.all);
router.get('/:id', VisitsController.one);
router.put('/:id', VisitsController.update);
router.delete('/:id', VisitsController.remove);
export default router;
