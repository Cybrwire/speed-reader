import { Router } from 'express';
import { healthCheck } from '../controllers/health.js';

const r = Router();

r.get('/health', healthCheck);

export default r;