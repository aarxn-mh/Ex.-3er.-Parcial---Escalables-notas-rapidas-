import { Router } from 'express';
import { getNotas, createNota } from '../controllers/nota.controller.js';

const router = Router();

router.get('/', getNotas);
router.post('/', createNota);

export default router;