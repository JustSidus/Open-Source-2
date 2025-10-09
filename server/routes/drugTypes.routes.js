import { Router } from 'express';
import { DrugType } from '../models/index.js';
import { createController } from '../controllers/generic.controller.js';

const router = Router();
const c = createController(DrugType);
router.post('/', c.create);
router.get('/', c.all);
router.get('/:id', c.one);
router.put('/:id', c.update);
router.delete('/:id', c.remove);
export default router;
