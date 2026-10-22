import { Router } from 'express';
import { parseJpInput } from '../controllers/parse.js';

const r = Router();

r.post('/parse', parseJpInput);

export default r;